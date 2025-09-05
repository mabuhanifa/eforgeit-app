"use client";

import { flattenedNavigation } from "@/lib/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Pager() {
  const pathname = usePathname();
  const currentIndex = flattenedNavigation.findIndex(
    (item) => item.href === pathname
  );

  const prev = currentIndex > 0 ? flattenedNavigation[currentIndex - 1] : null;
  const next =
    currentIndex < flattenedNavigation.length - 1
      ? flattenedNavigation[currentIndex + 1]
      : null;

  if (!prev && !next) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between mt-8 pt-4 border-t">
      {prev ? (
        <Link
          href={prev.href}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          &larr; {prev.title}
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          {next.title} &rarr;
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
