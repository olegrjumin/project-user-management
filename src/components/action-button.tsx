import { cn } from "@/lib/utils";
import React from "react";

type ActionButtonProps = {
  icon: React.ReactNode;
  text?: string;
  onClick: () => void;
  className?: string;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  text,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center bg-white rounded shadow-custom h-8 px-2",
        text ? "w-auto" : "w-8",
        className
      )}
    >
      <span className="text-gray-50">{icon}</span>
      {text && (
        <span className="ml-2 text-gray-70 text-sm font-medium">{text}</span>
      )}
    </button>
  );
};
