#!/bin/bash

# Azure SQL Configuration for Mobile Parts Application
# Your Configuration Details

echo "🔧 Setting up Azure SQL Environment Variables..."

# Your Azure SQL Configuration
export AZURE_SQL_SERVER="mobileparts-server.database.windows.net"
export AZURE_SQL_DATABASE="db-mobileparts"
export AZURE_SQL_USERNAME="sql_admin"
export AZURE_SQL_PASSWORD="Saketh117"
export SPRING_PROFILES_ACTIVE="sqlserver"

echo "✅ Environment variables set!"
echo ""
echo "📋 Your Configuration:"
echo "   Server:   $AZURE_SQL_SERVER"
echo "   Database: $AZURE_SQL_DATABASE"
echo "   Username: $AZURE_SQL_USERNAME"
echo "   Profile:  $SPRING_PROFILES_ACTIVE"
echo ""
echo "🚀 To start your application, run:"
echo "   cd /Users/saketh/project_codes/test_projects/final_project/backend"
echo "   mvn spring-boot:run"
echo ""
echo "💡 Or run in one command:"
echo "   source setup-azure-sql.sh && cd backend && mvn spring-boot:run"
echo ""
