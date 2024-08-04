import { ROLES } from "@/constants";
import { cn } from "@/lib/utils";
import { Role } from "@/types";
import React from "react";

const roleConfig: Record<Role, { label: string; className: string }> = {
  [ROLES.ADMIN]: {
    label: "Admin",
    className: "bg-purple-20 text-purple-80",
  },
  [ROLES.ACCOUNT_MANAGER]: {
    label: "Account manager",
    className: "bg-pink-20 text-pink-80",
  },
  [ROLES.AGENT]: {
    label: "Agent",
    className: "bg-blue-20 text-blue-80",
  },
  [ROLES.EXTERNAL_REVIEWER]: {
    label: "External reviewer",
    className: "bg-orange-20 text-orange-80",
  },
};

interface RoleBadgeProps {
  role: Role;
  className?: string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className }) => {
  const { label, className: roleClassName } = roleConfig[role];

  return (
    <div
      data-testid="role-badge"
      className={cn(
        "h-6 px-2 py-[3px] rounded inline-flex items-center",
        roleClassName,
        className
      )}
    >
      <div className="text-xs font-medium font-sans whitespace-nowrap">
        {label}
      </div>
    </div>
  );
};
