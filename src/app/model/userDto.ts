import {Role} from "./role";
import {Image} from "./image";

export class UserDto {
  id: number;
  email: string;
  fio: string;
  phone: string;
  role: Role[];
  rating: number;
  imgIds: number[];
  description: string;

  constructor() {
    this.imgIds = [];
  }
}
