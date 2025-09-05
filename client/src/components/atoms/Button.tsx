import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white focus:ring-indigo-500",
    secondary:
      "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white focus:ring-green-500",
    danger:
      "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white focus:ring-red-500",
    outline:
      "bg-white border border-indigo-500 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
  };

  const sizeClasses = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-3 px-6",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
