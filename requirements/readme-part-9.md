- Modify The Schema Dropping Things -> PostgreSQL DROP TABLE, DROP COLUMN, DROP SCHEMA, etc.
- CREATE TABLE -> PostgreSQL CREATE TABLE statement
- Constraints -> PostgreSQL Constraints: PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, NOT NULL

Normalization & Data Integrity

- Normalization -> Applying Normal Forms (1NF, 2NF, 3NF, BCNF) to PostgreSQL Table Design
- Data Integrity -> Enforced via PostgreSQL Constraints and Data Types
- Entity Integrity -> PRIMARY KEY and UNIQUE constraints
- Referential Integrity -> FOREIGN KEY constraints with ON UPDATE/ON DELETE rules (CASCADE, SET NULL, RESTRICT)
- Domain Integrity -> Data Types, CHECK constraints, NOT NULL
- User-defined Integrity -> CHECK constraints and TRIGGERs
- The UNIQUE Constraint -> PostgreSQL UNIQUE constraint
- Where to ensure integrity -> Emphasis on enforcing integrity in PostgreSQL itself via constraints

DML (Data Manipulation Language) & Querying

- Creating New Record -> PostgreSQL INSERT statement
- Inserting, Updating & Deleting Records -> PostgreSQL INSERT, UPDATE, DELETE statements
- String Literals Quoting Strings -> Using single quotes ('text'), dollar-quoting ($$text$$), or double quotes for identifiers ("ColumnName")
- Handling Special Characters -> PostgreSQL string escaping with E'...\'...' or dollar-quoting
- Combining Multiple Conditions -> Using AND, OR with the WHERE clause
- Operators of WHERE Clause -> PostgreSQL Operators: =, !=, <, >, LIKE, ILIKE, ~ (regex), IN, BETWEEN, IS NULL
- Sorting Record Filtering Records -> ORDER BY and WHERE clauses
- Sorting by Multiple Fields -> ORDER BY column1 DESC, column2 ASC;
- Getting a Slice of Records -> LIMIT and OFFSET clauses
