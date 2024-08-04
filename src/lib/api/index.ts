import { User } from "@/types";
import { ColumnSort, SortingState } from "@tanstack/react-table";
import usersData from "./users.json";
import { sleep } from "../utils";

export type UserApiResponse = {
  data: User[];
  meta: {
    totalRowCount: number;
  };
};

export const fetchUsers = async (
  start: number,
  size: number,
  query: string = "",
  sorting?: SortingState
): Promise<UserApiResponse> => {
  let filteredData = [...usersData.users] as User[];

  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filteredData = filteredData.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery)
    );
  }

  if (sorting?.length) {
    const sort = sorting[0] as ColumnSort;
    const { id, desc } = sort as { id: keyof User; desc: boolean };
    filteredData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1;
      }
      return a[id] > b[id] ? 1 : -1;
    });
  }

  await sleep(500);

  return {
    data: filteredData.slice(start, start + size),
    meta: {
      totalRowCount: filteredData.length,
    },
  };
};
