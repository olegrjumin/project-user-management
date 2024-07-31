import { cn } from "@/lib/utils";
import React from "react";

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onCheckedChange,
  disabled = false,
  className,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckedChange) {
      onCheckedChange(event.target.checked);
    }
  };

  return (
    <label
      className={cn(
        "relative inline-flex items-center cursor-pointer",
        className
      )}
    >
      <input
        type="checkbox"
        className="absolute opacity-0 w-0 h-0"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      <div
        className={cn(
          "w-4 h-4 rounded-[3px] border transition-colors duration-200 ease-in-out flex items-center justify-center",
          checked ? "bg-brand-50 border-brand-50" : "bg-white border-gray-40",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "transition-opacity duration-200",
            checked ? "opacity-100" : "opacity-0"
          )}
        >
          <path
            d="M7.85328 0.808227C8.26211 0.376547 8.95503 0.394793 9.34058 0.847391L9.40737 0.925794C9.74294 1.31973 9.72254 1.90461 9.36033 2.2742L4.76472 6.96348C4.3726 7.36359 3.72832 7.36355 3.33624 6.96341L0.653528 4.22548C0.28558 3.84996 0.271242 3.25365 0.620715 2.86088L0.667947 2.8078C1.05892 2.36838 1.74285 2.35966 2.14491 2.78896L4.05045 4.82358L7.85328 0.808227Z"
            fill="white"
          />
        </svg>
      </div>
    </label>
  );
};
