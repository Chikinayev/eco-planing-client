import {Role} from "./role";

export class UserDto {
  email: string;
  fio: string;
  phone: string;
  role: Role[];
  rating: number;
  imgUrls: string[];
}
