import { User } from "@/types";
import usersData from "./users.json";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type UserApiResponse = {
  data: User[];
  meta: {
    totalRowCount: number;
  };
};

export const fetchUsers = async (
  start: number,
  size: number,
  query: string = ""
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

  await sleep(500);

  return {
    data: filteredData.slice(start, start + size),
    meta: {
      totalRowCount: filteredData.length,
    },
  };
};
