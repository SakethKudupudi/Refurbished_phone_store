# Terraform Variables

variable "prefix" {
  description = "Prefix for resource names"
  type        = string
  default     = "mobileparts"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "East US"
}

variable "openai_location" {
  description = "Azure region for OpenAI (limited availability)"
  type        = string
  default     = "East US"
}

variable "db_admin_username" {
  description = "PostgreSQL admin username"
  type        = string
  sensitive   = true
}

variable "db_admin_password" {
  description = "PostgreSQL admin password"
  type        = string
  sensitive   = true
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default = {
    Environment = "Production"
    Project     = "Mobile Parts E-Commerce"
    ManagedBy   = "Terraform"
  }
}
