import { User } from "@/types";
import usersData from "./users.json";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUsers = async (): Promise<User[]> => {
  const sleepTime = import.meta.env.DEV ? 0 : 500;
  await sleep(sleepTime);

  return usersData.users.slice(0, 9) as User[];
};
