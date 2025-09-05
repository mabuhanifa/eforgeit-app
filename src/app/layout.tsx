import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter-var" });
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code-var",
});

export const metadata: Metadata = {
  title: "The Ultimate PostgreSQL Guide",
  description:
    "The definitive online resource for learning and mastering PostgreSQL.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
