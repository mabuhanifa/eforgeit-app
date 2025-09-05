- Analytics: Vercel Analytics or a similar privacy-focused tool to track page views and user engagement.

Core Concepts & Data Modeling

- Conceptual data model | Logical data model -> Entity-Relationship Diagrams (ERDs) in PostgreSQL
- Entity | Weak entity -> Tables | Tables with foreign keys in the primary key (to represent weak entities)
- Attributes -> Columns
- Attributes - simple vs composite -> Atomic columns (e.g., first_name) vs. Using a composite TYPE or separate related tables
- Attributes - single-valued vs multi-valued -> Single column vs. Using Arrays (TEXT[]) or a separate related table with a foreign key (more normalized)
- Attributes - complex -> Using PostgreSQL data types: JSON/JSONB, Arrays, User-Defined Types (UDTs)
- Attributes - derived vs stored -> Generated Columns (as of PostgreSQL 12) vs. Regular Columns
- Attributes - key attributes -> Primary Key constraints, Unique constraints
- Attributes - null values -> NULL values and the NOT NULL constraint
- Relationship -> Foreign Key constraints (REFERENCES)
- Relationship - cardinality ratio -> Foreign Key constraints (1:1, 1:N) | Junction tables for M:N
- Relationship - participation constraints -> NOT NULL on foreign key columns (total participation) vs. NULL allowed (partial participation)
- Relationship - associative / intersection entity -> Junction Table / Associative Table
- Entity - generalization | specialization -> Table Inheritance (PostgreSQL-specific feature) or discriminators with CHECK constraints

Schema Design & DDL (Data Definition Language)

- Relational Schemas -> PostgreSQL CREATE SCHEMA and CREATE TABLE
- Export SQL -> pg_dump utility
- ERD to DB Schema -> Translating an ERD into PostgreSQL CREATE TABLE statements
- Data Types -> PostgreSQL Data Types: SERIAL/BIGSERIAL, VARCHAR(n), TEXT, INT, BIGINT, NUMERIC, BOOLEAN, TIMESTAMPTZ, JSONB, UUID, etc.
- Modify The Schema Updating Tables -> PostgreSQL ALTER TABLE: ADD COLUMN, DROP COLUMN, ALTER COLUMN, ADD CONSTRAINT
