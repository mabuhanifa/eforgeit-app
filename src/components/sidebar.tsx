"use client";

import { navigation } from "@/lib/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block fixed top-14 z-30 -ml-2 h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:w-64">
      <div className="relative h-full overflow-y-auto p-6 pr-0 lg:p-8">
        <nav className="space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h4 className="mb-2 font-semibold text-sm">{section.title}</h4>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                        pathname === link.href
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
