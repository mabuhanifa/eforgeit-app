"use client";

import { Header } from "@/components/header";
import { Pager } from "@/components/pager";
import { Sidebar } from "@/components/sidebar";

const docsConfig = {
  sidebarNav: [
    {
      title: "The Fundamentals",
      items: [
        {
          title: "Introduction to PostgreSQL",
          href: "/docs/fundamentals/introduction-to-postgresql",
        },
        {
          title: "Installation and Setup",
          href: "/docs/fundamentals/installation-and-setup",
        },
        {
          title: "SQL Basics: Querying",
          href: "/docs/fundamentals/sql-basics-querying",
        },
        {
          title: "SQL Basics: DDL & DML",
          href: "/docs/fundamentals/sql-basics-ddl-dml",
        },
        {
          title: "Core Data Types",
          href: "/docs/fundamentals/core-data-types",
        },
        {
          title: "Table Design and Constraints",
          href: "/docs/fundamentals/table-design-and-constraints",
        },
      ],
    },
    {
      title: "Intermediate SQL",
      items: [
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
      title: "Advanced Topics & Performance",
      items: [
        {
          title: "Indexing for Performance",
          href: "/docs/advanced/indexing",
        },
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
  ],
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto flex">
          <Sidebar items={docsConfig.sidebarNav} />
          <main className="relative py-6 lg:gap-10 lg:py-8 w-full lg:pl-8">
            <div className="mx-auto w-full min-w-0">
              <div className="prose max-w-none">{children}</div>
              <Pager />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
