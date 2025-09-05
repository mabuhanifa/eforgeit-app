import React from "react";

interface CalloutProps {
  type?: "note" | "warning" | "tip";
  children: React.ReactNode;
}

const typeStyles = {
  note: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
  },
  warning: {
    container: "bg-red-50 border-red-200 text-red-800",
  },
  tip: {
    container: "bg-green-50 border-green-200 text-green-800",
  },
};

export function Callout({ type = "note", children }: CalloutProps) {
  const styles = typeStyles[type];
  const title = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className={`my-6 rounded-lg border p-4 ${styles.container}`}>
      <p className="mb-2 font-semibold">{title}</p>
      <div className="prose-p:my-0">{children}</div>
    </div>
  );
}
