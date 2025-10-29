# Supabase Setup for Mobile Parts Project

This document explains how to create the required tables in your Supabase Postgres database and seed basic data.

Files
- backend/src/main/resources/schema-supabase.sql — SQL DDL that creates enums and tables used by the application.
- backend/src/main/resources/data-supabase.sql — optional seed data (brands, models, components).
- scripts/apply_supabase_schema.sh — helper script to apply the schema using psql.

Prerequisites
- psql installed locally (Postgres client).
- Supabase project created. Get the Postgres connection string (Service Role or DB URL) from the Supabase dashboard: Project → Settings → Database → Connection string.
  - For applying schema you can use the Service Role key connection string; for production use follow security best practices.

Steps
1. Export your Supabase DB URL (example):

```bash
export SUPABASE_DB_URL="postgres://postgres:YOUR_PASSWORD@db.********.supabase.co:5432/postgres"
```

Note: Supabase dashboard shows connection strings; copy the one that contains the username/password.

2. Apply the schema (creates enums and tables):

```bash
./scripts/apply_supabase_schema.sh
```

3. Optional: Seed the database with sample data (brands/models/components):

```bash
psql "$SUPABASE_DB_URL" -f backend/src/main/resources/data-supabase.sql
```

4. Verify tables:

```bash
psql "$SUPABASE_DB_URL" -c "\dt"
```

Security notes
- Do not commit Service Role keys into source control. Use environment variables or CI secrets.
- Consider using Supabase Row Level Security (RLS) and policies for production.

If you want, I can also:
- Seed more realistic data.
- Add SQL migrations under a migrations folder with incremental versions.
- Configure a GitHub Actions workflow to run the schema automatically in a staging database.


