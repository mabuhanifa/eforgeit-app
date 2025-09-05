"use client";

import { Header } from "@/components/header";
import { Pager } from "@/components/pager";
import { Sidebar } from "@/components/sidebar";
import { MDXProvider } from "@mdx-js/react";

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
          <Sidebar />
          <main className="relative py-6 lg:gap-10 lg:py-8 w-full lg:pl-8">
            <div className="mx-auto w-full min-w-0">
              <div className="prose max-w-none">
                <MDXProvider>{children}</MDXProvider>
              </div>
              <Pager />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
