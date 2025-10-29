#!/usr/bin/env bash
set -euo pipefail

# Usage:
# SUPABASE_DB_URL="postgres://user:password@host:port/dbname" ./scripts/apply_supabase_schema.sh

SCHEMA_FILE="backend/src/main/resources/schema-supabase.sql"

if [ -z "${SUPABASE_DB_URL:-}" ]; then
  echo "ERROR: SUPABASE_DB_URL environment variable not set. Example: postgres://postgres:password@db.supabase.co:5432/postgres"
  exit 1
fi

if [ ! -f "$SCHEMA_FILE" ]; then
  echo "ERROR: Schema file not found: $SCHEMA_FILE"
  exit 1
fi

echo "Applying schema to: $SUPABASE_DB_URL"

# Run psql
psql "$SUPABASE_DB_URL" -f "$SCHEMA_FILE"

echo "Schema applied successfully."
