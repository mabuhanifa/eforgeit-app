"use client";
import { navigation } from "@/lib/navigation";
import Link from "next/link";

export function MobileNav({ closeNav }: { closeNav: () => void }) {
  return (
    <div className="fixed inset-0 top-14 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-white p-4 shadow-md">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {navigation.map((section, index) => (
            <div key={index} className="py-2">
              <h4 className="mb-2 font-semibold text-sm">{section.title}</h4>
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex w-full items-center rounded-md p-2 hover:underline"
                  onClick={closeNav}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
