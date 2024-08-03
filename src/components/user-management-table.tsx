import { fetchUsers, UserApiResponse } from "@/lib/api";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import { UserManagementTableActions } from "./user-management-table-actions";
import { columns } from "./user-management-table-columns";

interface UserManagementTableProps {
  query: string;
}

export const FETCH_SIZE = 9;
export const ROW_HEIGHT = 64;
export const GAP = 4;
export const HEADER_HEIGHT = 32;
export const VISIBLE_ROWS = 9;

export const UserManagementTable: React.FC<UserManagementTableProps> = ({
  query,
}) => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const { data, fetchNextPage, isFetching } = useInfiniteQuery<UserApiResponse>(
    {
      queryKey: ["users", query, sorting],
      queryFn: async ({ pageParam = 0 }) => {
        const start = (pageParam as number) * FETCH_SIZE;
        return fetchUsers(start, FETCH_SIZE, query, sorting);
      },
      initialPageParam: 0,
      getNextPageParam: (_, pages) => pages.length,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    }
  );

  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );
  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount &&
          hasScrolled
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount, hasScrolled]
  );

  React.useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const table = useReactTable({
    data: flatData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      rowSelection,
      sorting,
    },
    manualSorting: true,
  });
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 68,
    getScrollElement: () => tableContainerRef.current,
    overscan: 5,
  });

  const tableHeight = VISIBLE_ROWS * ROW_HEIGHT + HEADER_HEIGHT + 8 * GAP;

  return (
    <div className="space-y-4 bg-white pt-6 pb-4 px-4 rounded-lg">
      <UserManagementTableActions table={table} />

      <div
        ref={tableContainerRef}
        style={{
          height: tableHeight,
          overflow: "auto",
          position: "relative",
          width: "100%",
        }}
        onScroll={() => {
          if (!hasScrolled) {
            setHasScrolled(true);
          }
          fetchMoreOnBottomReached(tableContainerRef.current);
        }}
      >
        <div data-testid="user-management-table" style={{ display: "grid" }}>
          <div
            style={{
              display: "grid",
              position: "sticky",
              top: 0,
              zIndex: 1,
              background: "white",
            }}
            data-testid="user-management-table-header"
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <div
                key={headerGroup.id}
                style={{ display: "flex", width: "100%" }}
              >
                {headerGroup.headers.map((header, index) => (
                  <div
                    key={header.id}
                    className={cn("h-8", {
                      "p-2 pl-4": index === 0,
                      "pl-0": index % 2 === 1,
                    })}
                    style={{
                      display: "flex",
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {!isFetching && totalFetched === 0 && (
              <div className="pt-10 flex items-center justify-center">
                <p className="text-gray-20 text-md">No results found</p>
              </div>
            )}

            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<User>;
              return (
                <div
                  data-testid={`user-management-table-row-${row.id}`}
                  data-index={virtualRow.index}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  key={row.id}
                  className={cn(
                    "border-white border-b-4 data-[state=selected]:bg-gray-10 data-[state=selected]:rounded-tr-lg data-[state=selected]:rounded-br-lg"
                  )}
                  style={{
                    display: "flex",
                    position: "absolute",
                    height: ROW_HEIGHT + GAP,
                    transform: `translateY(${virtualRow.start}px)`,
                    width: "100%",
                  }}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <div
                      key={cell.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: cell.column.getSize(),
                      }}
                      className={cn("relative", {
                        "p-3 pl-4": index === 0,
                        "pl-0": index % 2 === 1,
                      })}
                    >
                      {index === 0 && (
                        <div
                          className={cn(
                            `absolute h-full left-0 top-0 bottom-0 w-1 rounded-l-lg transition-colors duration-200`,
                            row.getIsSelected()
                              ? "bg-brand-50"
                              : "bg-transparent"
                          )}
                        />
                      )}

                      <div className="flex items-center h-full max-h-8">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
