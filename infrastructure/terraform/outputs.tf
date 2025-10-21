# Terraform Outputs

output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

output "postgresql_fqdn" {
  description = "FQDN of PostgreSQL server"
  value       = azurerm_postgresql_flexible_server.main.fqdn
}

output "postgresql_database_name" {
  description = "Name of the PostgreSQL database"
  value       = azurerm_postgresql_flexible_server_database.main.name
}

output "storage_account_name" {
  description = "Name of the storage account"
  value       = azurerm_storage_account.main.name
}

output "storage_primary_connection_string" {
  description = "Primary connection string for storage account"
  value       = azurerm_storage_account.main.primary_connection_string
  sensitive   = true
}

output "key_vault_uri" {
  description = "URI of the Key Vault"
  value       = azurerm_key_vault.main.vault_uri
}

output "openai_endpoint" {
  description = "Endpoint for Azure OpenAI"
  value       = azurerm_cognitive_account.openai.endpoint
}

output "openai_key" {
  description = "Primary key for Azure OpenAI"
  value       = azurerm_cognitive_account.openai.primary_access_key
  sensitive   = true
}

output "search_endpoint" {
  description = "Endpoint for Azure AI Search"
  value       = "https://${azurerm_search_service.main.name}.search.windows.net"
}

output "search_admin_key" {
  description = "Admin key for Azure AI Search"
  value       = azurerm_search_service.main.primary_key
  sensitive   = true
}

output "frontend_url" {
  description = "URL of the frontend App Service"
  value       = "https://${azurerm_linux_web_app.frontend.default_hostname}"
}

output "backend_url" {
  description = "URL of the backend Spring App"
  value       = azurerm_spring_cloud_app.backend.url
}

output "application_insights_instrumentation_key" {
  description = "Instrumentation key for Application Insights"
  value       = azurerm_application_insights.main.instrumentation_key
  sensitive   = true
}

output "application_insights_connection_string" {
  description = "Connection string for Application Insights"
  value       = azurerm_application_insights.main.connection_string
  sensitive   = true
}
