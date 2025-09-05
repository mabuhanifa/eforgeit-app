- Handling Data-Type and Length Mismatch -> PostgreSQL explicit type casting (::TYPE or CAST()) and VARCHAR(n) length errors
- Errors and Warnings -> Reading PostgreSQL error messages (e.g., psql detail: ERROR: value too long for type character varying(5))

Joins & Functions

- How JOIN Works -> PostgreSQL Join Operations (Nested Loops, Hash Joins, Merge Joins)
- Types Of Join -> [INNER] JOIN, LEFT [OUTER] JOIN, RIGHT [OUTER] JOIN, FULL [OUTER] JOIN, CROSS JOIN
- Built in Functions -> PostgreSQL Functions
- String Manipulation -> CONCAT(), SUBSTRING(), TRIM(), LENGTH(), UPPER(), LOWER(), SPLIT_PART()
- Numeric Calculations -> ROUND(), CEIL(), FLOOR(), ABS(), mathematical operators
- Date and Time -> NOW(), CURRENT_DATE, CURRENT_TIMESTAMP, EXTRACT(), AGE(), DATE_PART(), INTERVAL
- Control Flow -> CASE ... WHEN ... END statements

Aggregation & Advanced Querying

- Aggregation -> Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX(), STRING_AGG()
- Aggregation with Grouping -> GROUP BY clause
- Aggregation with Filtering -> HAVING clause (filtering groups)
- Usages of DISTINCT -> SELECT DISTINCT and COUNT(DISTINCT column)
- Subquery -> PostgreSQL Subqueries (non-correlated and correlated)
- SubQuery VS Multiple Query -> Comparing subqueries with JOINs and CTEs (Common Table Expressions)
- SubQuery for UPDATE/DELETE -> Using subqueries in the WHERE clause of UPDATE and DELETE statements

Performance & Optimization

- What is an Index -> PostgreSQL Indexes (B-tree, Hash, GIN, GiST, BRIN, SP-GiST)
- Index in Database -> PostgreSQL Indexes are stored separately from the table heap.
- Why Use Indexes -> Improving performance of SELECT, WHERE, ORDER BY, and JOIN operations.
- PRIMARY KEY -> PRIMARY KEY constraint (automatically creates a unique B-tree index)
- Secondary KEY -> CREATE INDEX statement (creating secondary indexes)
- Planning Indexes -> Using EXPLAIN to analyze query plans and identify missing indexes
- Using Indexes -> Index usage is automatic and determined by the PostgreSQL query planner.
- FULLTEXT Index -> PostgreSQL Full-Text Search using GIN indexes with to_tsvector
- What is Query optimization -> The job of the PostgreSQL Query Planner/Optimizer
- Optimization techniques -> Reading EXPLAIN/EXPLAIN ANALYZE output, creating appropriate indexes, writing efficient queries, vacuuming.
- Execution Plan -> PostgreSQL EXPLAIN and EXPLAIN ANALYZE commands
- Operators -> Plan Nodes: Seq Scan, Index Scan, Index Only Scan, Nested Loop, Hash Join, Merge Join, Sort, Aggregate, etc.
- Query Store -> The pg_stat_statements extension (official equivalent for tracking query performance)

Programmability

- Views -> PostgreSQL VIEWs (including Materialized Views)
- Updating View -> Updatable Views (with certain conditions) or using INSTEAD OF triggers
- Stored Procedure -> PostgreSQL FUNCTIONs and PROCEDUREs (as of PG 11)
- Stored Procedure With Parameters -> CREATE FUNCTION with IN, OUT, INOUT parameters
- Execute Stored Procedure -> Using SELECT my_function(); or CALL my_procedure();
- Variables -> Using variables in DO blocks (PL/pgSQL) or within functions.
- What is a Trigger -> PostgreSQL TRIGGERs
- How to define Triggers -> CREATE TRIGGER paired with a trigger FUNCTION written in a language like PL/pgSQL
- Accessing subjected record -> Using NEW and OLD record variables in trigger functions.

Administration & Operations

- Type of Backup -> PostgreSQL Backup: Logical (pg_dump, pg_dumpall) vs. Physical (File System Level, PITR)
- Recovery Model -> PostgreSQL Write-Ahead Logging (WAL)
- Full vs Differential Backup -> Base backups with WAL archiving (enables PITR)
- Database Restore -> Using pg_restore or psql for logical backups; pg_rewind/pg_basebackup for physical.
- Replication -> PostgreSQL Replication: Physical (Streaming) vs. Logical
- Database monitoring -> Using the pg*stat*\* views (pg_stat_database, pg_stat_all_tables)
- Performance monitoring -> Using pg_stat_statements, EXPLAIN ANALYZE, and monitoring tools (pgBadger, Prometheus)
- Security -> PostgreSQL Roles and Privileges (GRANT, REVOKE), pg_hba.conf
- DB Encryption -> Transparent Data Encryption (TDE) via 3rd party tools, pgcrypto extension for column-level encryption.
- Scalability -> PostgreSQL Scalability: Read Scaling (Replication, Read Replicas), Partitioning, Connection Pooling (e.g., PgBouncer)
