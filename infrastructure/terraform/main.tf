# Main Terraform configuration for Mobile Parts E-Commerce Platform

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
  
  backend "azurerm" {
    resource_group_name  = "mobile-parts-terraform-rg"
    storage_account_name = "mobilepartstfstate"
    container_name       = "tfstate"
    key                  = "mobile-parts.terraform.tfstate"
  }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy = true
    }
  }
}

# Random suffix for globally unique resource names
resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

# Resource Group
resource "azurerm_resource_group" "main" {
  name     = "${var.prefix}-rg"
  location = var.location
  
  tags = var.tags
}

# Virtual Network
resource "azurerm_virtual_network" "main" {
  name                = "${var.prefix}-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  
  tags = var.tags
}

# Subnet for App Service
resource "azurerm_subnet" "app_service" {
  name                 = "app-service-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]
  
  delegation {
    name = "app-service-delegation"
    
    service_delegation {
      name = "Microsoft.Web/serverFarms"
      actions = [
        "Microsoft.Network/virtualNetworks/subnets/action"
      ]
    }
  }
}

# Subnet for Database
resource "azurerm_subnet" "database" {
  name                 = "database-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.2.0/24"]
  
  service_endpoints = ["Microsoft.Sql"]
}

# PostgreSQL Flexible Server
resource "azurerm_postgresql_flexible_server" "main" {
  name                   = "${var.prefix}-psql-${random_string.suffix.result}"
  resource_group_name    = azurerm_resource_group.main.name
  location               = azurerm_resource_group.main.location
  version                = "15"
  administrator_login    = var.db_admin_username
  administrator_password = var.db_admin_password
  
  storage_mb            = 32768
  sku_name              = "GP_Standard_D2s_v3"
  backup_retention_days = 7
  
  tags = var.tags
}

resource "azurerm_postgresql_flexible_server_database" "main" {
  name      = "mobileparts"
  server_id = azurerm_postgresql_flexible_server.main.id
  collation = "en_US.utf8"
  charset   = "utf8"
}

# Storage Account for Blob Storage
resource "azurerm_storage_account" "main" {
  name                     = "${var.prefix}storage${random_string.suffix.result}"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  
  blob_properties {
    cors_rule {
      allowed_headers    = ["*"]
      allowed_methods    = ["GET", "HEAD", "POST", "PUT"]
      allowed_origins    = ["*"]
      exposed_headers    = ["*"]
      max_age_in_seconds = 3600
    }
  }
  
  tags = var.tags
}

resource "azurerm_storage_container" "product_images" {
  name                  = "product-images"
  storage_account_name  = azurerm_storage_account.main.name
  container_access_type = "blob"
}

# Key Vault
resource "azurerm_key_vault" "main" {
  name                        = "${var.prefix}-kv-${random_string.suffix.result}"
  location                    = azurerm_resource_group.main.location
  resource_group_name         = azurerm_resource_group.main.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false
  
  sku_name = "standard"
  
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id
    
    secret_permissions = [
      "Get", "List", "Set", "Delete", "Purge"
    ]
  }
  
  tags = var.tags
}

# Azure Cognitive Services (OpenAI)
resource "azurerm_cognitive_account" "openai" {
  name                = "${var.prefix}-openai-${random_string.suffix.result}"
  location            = var.openai_location
  resource_group_name = azurerm_resource_group.main.name
  kind                = "OpenAI"
  sku_name            = "S0"
  
  tags = var.tags
}

# Azure AI Search
resource "azurerm_search_service" "main" {
  name                = "${var.prefix}-search-${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "standard"
  
  tags = var.tags
}

# App Service Plan for Frontend
resource "azurerm_service_plan" "frontend" {
  name                = "${var.prefix}-frontend-plan"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = "P1v2"
  
  tags = var.tags
}

# App Service for Frontend
resource "azurerm_linux_web_app" "frontend" {
  name                = "${var.prefix}-frontend"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_service_plan.frontend.location
  service_plan_id     = azurerm_service_plan.frontend.id
  
  site_config {
    always_on = true
    
    application_stack {
      node_version = "18-lts"
    }
  }
  
  app_settings = {
    "WEBSITE_NODE_DEFAULT_VERSION" = "18-lts"
    "SCM_DO_BUILD_DURING_DEPLOYMENT" = "true"
  }
  
  tags = var.tags
}

# Azure Spring Apps for Backend
resource "azurerm_spring_cloud_service" "main" {
  name                = "${var.prefix}-spring-app"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku_name            = "S0"
  
  tags = var.tags
}

resource "azurerm_spring_cloud_app" "backend" {
  name                = "mobile-parts-backend"
  resource_group_name = azurerm_resource_group.main.name
  service_name        = azurerm_spring_cloud_service.main.name
  
  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_spring_cloud_java_deployment" "backend" {
  name                = "default"
  spring_cloud_app_id = azurerm_spring_cloud_app.backend.id
  
  runtime_version = "Java_21"
  
  quota {
    cpu    = "2"
    memory = "4Gi"
  }
  
  environment_variables = {
    "SPRING_PROFILES_ACTIVE"           = "production"
    "AZURE_POSTGRESQL_URL"             = "jdbc:postgresql://${azurerm_postgresql_flexible_server.main.fqdn}:5432/${azurerm_postgresql_flexible_server_database.main.name}"
    "AZURE_POSTGRESQL_USERNAME"        = var.db_admin_username
    "AZURE_POSTGRESQL_PASSWORD"        = var.db_admin_password
    "AZURE_STORAGE_ACCOUNT_NAME"       = azurerm_storage_account.main.name
    "AZURE_STORAGE_ACCOUNT_KEY"        = azurerm_storage_account.main.primary_access_key
    "AZURE_KEYVAULT_URI"               = azurerm_key_vault.main.vault_uri
    "AZURE_OPENAI_ENDPOINT"            = azurerm_cognitive_account.openai.endpoint
    "AZURE_SEARCH_ENDPOINT"            = "https://${azurerm_search_service.main.name}.search.windows.net"
  }
}

# Application Insights
resource "azurerm_log_analytics_workspace" "main" {
  name                = "${var.prefix}-workspace"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
  
  tags = var.tags
}

resource "azurerm_application_insights" "main" {
  name                = "${var.prefix}-insights"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  workspace_id        = azurerm_log_analytics_workspace.main.id
  application_type    = "web"
  
  tags = var.tags
}

# Data source for current Azure client config
data "azurerm_client_config" "current" {}
