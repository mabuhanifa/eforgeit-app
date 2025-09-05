# Requirements: The Ultimate PostgreSQL Guide Website

## 1. Vision & Goals

- **Vision**: To create the definitive, free online resource for learning and mastering PostgreSQL.
- **Goals**:
  - **Educate**: Provide a comprehensive, structured learning path.
  - **Engage**: Provide clear and concise content.
  - **Accessibility**: Make high-quality database education freely available.
  - **Authority**: Be a trusted, professional, and up-to-date guide.
- **Target Audience**: Beginner, Intermediate, and Experienced Developers/DBAs.

## 2. Core Features

### 2.1. Content & Display

- **Markdown/MDX Rendering**: Flawless rendering of content, including code blocks, images, tables, and lists.
- **Syntax Highlighting**: Beautiful, clear syntax highlighting for SQL, Shell, etc.
- **Copy to Clipboard**: A one-click copy button on all code blocks.
- **Alerts/Callouts**: Specially styled blocks for notes, tips, and warnings.
- **Last Updated Timestamp**: Automatically generated timestamp on each page to show content freshness.

### 2.2. Navigation & Structure

- **Persistent Sidebar Navigation**: A hierarchical, collapsible tree view of all chapters, with the current section highlighted.
- **Search Bar**: A prominent search bar in the sidebar for instant access.
- **Top Navigation Bar**: Logo, high-level links, and a Light/Dark mode theme toggle.
- **Breadcrumbs**: A clear breadcrumb trail at the top of each content page.
- **Pagination**: "Next" & "Previous" buttons at the bottom of each page for sequential learning.

### 2.3. Search

- **Fast & Real-Time**: Instantly display results as the user types.
- **Fuzzy & Typo-Tolerant**: Handle minor typos gracefully.
- **Content-Aware**: Show snippets of matching text with the search term highlighted.

## 3. Design & UX

- **Aesthetic**: Clean, modern, minimalist, and developer-centric.
- **Color Palette**: A neutral base with a single vibrant accent color (e.g., PostgreSQL blue).
- **Typography**: Highly legible sans-serif font for body text and a clean monospaced font for code.
- **Responsiveness**: A fully responsive experience on all devices, from desktop to mobile.
- **Accessibility (a11y)**: Built to WCAG standards, ensuring keyboard navigability, high-contrast text, and proper semantic HTML.

## 4. Technical Requirements

- **Framework**: Must use **Next.js** (App Router).
- **Styling**: Must use **Tailwind CSS**.
- **Content Format**: Must use **MDX** (Markdown with JSX).
- **Deployment**: Must be deployable on **Vercel**.

## 5. Content Structure (High-Level)

- **Part 1: The Fundamentals**: Introduction, Installation, SQL Basics (Querying, DDL, DML), Data Types, and Table Design.
- **Part 2: Intermediate SQL & Database Design**: Joins, Aggregation, Subqueries, CTEs, Window Functions, and Normalization.
- **Part 3: Advanced Topics & Performance**: Indexing, Transactions, Advanced Data Types (JSONB, Arrays), Views, and Functions.
- **Part 4: Administration, Security & Scalability**: User Management, Backup/Recovery, Replication, and Performance Tuning.
