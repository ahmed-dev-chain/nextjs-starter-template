import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-sm font-medium text-foreground/80">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`h-11 w-full rounded-lg border bg-background px-4 py-2 text-sm ring-offset-background transition-all placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10 disabled:cursor-not-allowed disabled:opacity-50 ${
            error 
              ? "border-red-500 focus:ring-red-500/10" 
              : "border-foreground/10 focus:border-foreground/20"
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
