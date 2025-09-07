"use client";

import { Callout } from "@/components/callout";
import { MDXProvider } from "@mdx-js/react";
import Content from "./content.mdx";

const components = {
  Callout,
};

export default function PerformanceTuningPage() {
  return (
    <MDXProvider components={components}>
      <Content />
    </MDXProvider>
  );
}
