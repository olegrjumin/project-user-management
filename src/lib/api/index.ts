import { User } from "@/types";
import usersData from "./users.json";

export const fetchUsers = async (search: string = ""): Promise<User[]> => {
  const filteredUsers = usersData.users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return filteredUsers.slice(0, 9) as User[];
};
