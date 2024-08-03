import { cn } from "@/lib/utils";
import { User } from "@/types";

import { ColumnDef } from "@tanstack/react-table";
import { ActionButton } from "./action-button";
import { Checkbox } from "./checkbox";
import { ArrowDownSmall, EditIcon, TrashIcon } from "./icons";
import { RoleBadge } from "./role-badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        </div>
      );
    },
    size: 45,
  },
  {
    accessorKey: "name",
    header: () => {
      return <div className="text-xs text-gray-60 flex items-center">User</div>;
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <Avatar className="size-8">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-sm text-gray-60 font-normal">
            {row.original.email}
          </div>
        </div>
      </div>
    ),
    size: 360,
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <div
          data-testid="user-management-table-permission-sort"
          className="flex items-center cursor-pointer text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="mr-1 text-gray-60">Permission</span>
          {column.getIsSorted() === "asc" ? (
            <ArrowDownSmall className="size-3 rotate-180" />
          ) : (
            <ArrowDownSmall className="size-3" />
          )}
        </div>
      );
    },
    cell: ({ row }) => {
      return <RoleBadge role={row.original.role} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div
        className={cn(
          `flex space-x-1 opacity-0 transition-opacity`,
          row.getIsSelected() ? "opacity-100" : "opacity-0"
        )}
      >
        <ActionButton
          onClick={() => {}}
          icon={<EditIcon className="size-4" />}
          text="Edit"
        />
        <ActionButton
          onClick={() => {}}
          icon={<TrashIcon className="size-4" />}
        />
      </div>
    ),
  },
];
