import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

interface SearchFieldProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  placeholder = "Search",
  onChange,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={cn("relative w-[204px]", className)}>
      <Input
        type="text"
        placeholder={placeholder}
        className="h-10 pl-10 pr-4 text-sm text-gray-60 bg-white rounded focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-50"
        >
          <path
            d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
