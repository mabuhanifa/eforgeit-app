"use client";

import { MDXProvider } from "@mdx-js/react";

// This component provides a client boundary for MDX content,
// allowing it to use context which is not available in Server Components.
export function CustomMdxProvider({ children }: { children: React.ReactNode }) {
  return <MDXProvider>{children}</MDXProvider>;
}
