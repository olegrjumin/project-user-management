import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetchUsers, UserApiResponse } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { UserManagementTableAction } from "./user-management-table-action";
import { columns } from "./user-management-table-columns";

interface UserManagementTableProps {
  query: string;
}

export const FETCH_SIZE = 9;
export const ROW_HEIGHT = 64;
export const HEADER_HEIGHT = 32;
export const VISIBLE_ROWS = 9;

export const UserManagementTable: React.FC<UserManagementTableProps> = ({
  query,
}) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const { data } = useInfiniteQuery<UserApiResponse>({
    queryKey: ["users", query],
    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * FETCH_SIZE;
      return fetchUsers(start, FETCH_SIZE, query);
    },
    initialPageParam: 0,
    getNextPageParam: (_, pages) => pages.length,
    refetchOnWindowFocus: false,
  });

  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  const table = useReactTable({
    data: flatData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className="space-y-4 bg-white pt-6 pb-4 px-4 rounded-lg">
      <UserManagementTableAction table={table} />
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
