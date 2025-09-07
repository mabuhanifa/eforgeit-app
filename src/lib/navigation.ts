export const navigation = [
  {
    title: "Part 1: The Fundamentals",
    links: [
      {
        title: "Introduction to PostgreSQL",
        href: "/docs/fundamentals/introduction-to-postgresql",
      },
      {
        title: "Installation & Setup",
        href: "/docs/fundamentals/installation-and-setup",
      },
      {
        title: "SQL Basics: Querying Data",
        href: "/docs/fundamentals/sql-basics-querying",
      },
      {
        title: "SQL Basics: DDL & DML",
        href: "/docs/fundamentals/sql-basics-ddl-dml",
      },
      { title: "Core Data Types", href: "/docs/fundamentals/core-data-types" },
      {
        title: "Table Design & Constraints",
        href: "/docs/fundamentals/table-design-and-constraints",
      },
    ],
  },
  {
    title: "Part 2: Intermediate SQL",
    links: [
      { title: "Joins", href: "/docs/intermediate/joins" },
      {
        title: "Aggregation & Grouping",
        href: "/docs/intermediate/aggregation-and-grouping",
      },
      { title: "Subqueries", href: "/docs/intermediate/subqueries" },
      {
        title: "Common Table Expressions (CTEs)",
        href: "/docs/intermediate/ctes",
      },
      { title: "Set Operations", href: "/docs/intermediate/set-operations" },
      {
        title: "Window Functions",
        href: "/docs/intermediate/window-functions",
      },
      {
        title: "Database Normalization",
        href: "/docs/intermediate/database-normalization",
      },
    ],
  },
  {
    title: "Part 3: Advanced Topics",
    links: [
      { title: "Indexing for Performance", href: "/docs/advanced/indexing" },
      {
        title: "Transactions & Concurrency",
        href: "/docs/advanced/transactions-concurrency",
      },
      {
        title: "Advanced Data Types",
        href: "/docs/advanced/advanced-data-types",
      },
      {
        title: "Views & Materialized Views",
        href: "/docs/advanced/views-materialized-views",
      },
      {
        title: "Functions & Stored Procedures",
        href: "/docs/advanced/functions-stored-procedures",
      },
    ],
  },
  {
    title: "Part 4: Administration",
    links: [
      { title: "User Management & Security", href: "/docs/admin/security" },
      { title: "Backup & Recovery", href: "/docs/admin/backup-and-recovery" },
      { title: "Replication", href: "/docs/admin/replication" },
      { title: "Performance Tuning", href: "/docs/admin/performance-tuning" },
    ],
  },
];

export const flattenedNavigation = navigation.flatMap(
  (section) => section.links
);
