import * as React from "react";
import cn from "classnames";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "default";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400",
          variant === "outline"
            ? "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
            : "bg-blue-700 text-white hover:bg-blue-800",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
