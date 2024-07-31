import { ROLES } from "./constants";

export type Role = (typeof ROLES)[keyof typeof ROLES];

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: Role;
}
