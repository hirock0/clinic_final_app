"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={`btn w-full flex justify-center items-center gap-2 ${className} ${loading ? 'btn-disabled' : ''}`}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Registering...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
