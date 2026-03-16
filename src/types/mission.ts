import type { UserDTO } from "./User";

export interface Mission {
  id: number;
  name: string;
  description: string;
  date: Date;
  price: number;
  user: UserDTO;
  location: string;
  photo: string[];
}
