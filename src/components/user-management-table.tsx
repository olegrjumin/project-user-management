import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetchUsers } from "@/lib/api";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { useQuery } from "react-query";
import { ActionButton } from "./action-button";
import { Checkbox } from "./checkbox";
import { ArrowDownSmall, EditIcon, TrashIcon } from "./icons";
import { RoleBadge } from "./role-badge";

const columns: ColumnDef<User>[] = [
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
        <div>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => {
      return <div className="text-xs text-gray-60">User</div>;
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <Avatar className="size-8">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-sm text-gray-60">{row.original.email}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="mr-2 text-gray-60">Permission</span>
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

export const UserManagementTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery<User[]>("users", fetchUsers);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="space-y-4 bg-white pt-6 pb-4 px-4 rounded-lg">
      {selectedCount >= 0 && (
        <div className="flex items-center h-8 ml-4">
          <div className="text-gray-80 font-medium leading-normal mr-6">
            {selectedCount} {selectedCount === 1 ? "user" : "users"} selected
          </div>
          {selectedCount > 0 && (
            <div className="flex space-x-2">
              <ActionButton
                onClick={() => {}}
                icon={<EditIcon className="size-4" />}
                text="Edit"
              />
              <ActionButton
                onClick={() => {}}
                icon={<TrashIcon className="size-4" />}
                text="Delete"
              />
            </div>
          )}
        </div>
      )}

      <Table className="border-none">
        <TableHeader className="border-none">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-none">
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={cn("h-8", {
                    "w-[10px] p-2 pl-4": index === 0,
                    "pl-0": index % 2 === 1,
                  })}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() ? "selected" : undefined}
                key={row.id}
                className={cn("border-white border-b-4")}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn("relative", {
                      "p-3 pl-4": index === 0,
                      "pl-0": index % 2 === 1,
                      "rounded-tr-lg rounded-br-lg":
                        index === columns.length - 1,
                    })}
                  >
                    {index === 0 && (
                      <div
                        className={cn(
                          `absolute h-full left-0 top-0 bottom-0 w-1 rounded-l-lg transition-colors duration-200`,
                          row.getIsSelected() ? "bg-brand-50" : "bg-transparent"
                        )}
                      />
                    )}

                    <div className="flex items-center h-full max-h-8">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
