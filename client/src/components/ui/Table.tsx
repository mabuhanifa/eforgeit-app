import React from "react";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

const Table = ({ headers, children }: TableProps) => {
  return (
    <div className="w-full overflow-auto rounded-lg border">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50">
            {headers.map((header) => (
              <th
                key={header}
                className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
