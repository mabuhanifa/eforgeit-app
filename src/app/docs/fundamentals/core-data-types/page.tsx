"use client";

import Content from "./content.mdx";
import { MDXProvider } from '@mdx-js/react';
import { Callout } from '@/components/callout';

const components = {
  Callout,
};

export default function CoreDataTypesPage() {
  return (
    <MDXProvider components={components}>
      <Content />
    </MDXProvider>
  );
}
