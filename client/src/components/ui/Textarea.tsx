import React from "react";

type TextareaProps = React.ComponentProps<"textarea">;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${className}`}
        ref={ref}
        rows={3}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
