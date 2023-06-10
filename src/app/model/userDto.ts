import {Role} from "./role";
import {Image} from "./image";
import {City} from "./city";

export class UserDto {
  id: number;
  email: string;
  fio: string;
  phone: string;
  role: Role[];
  rating: number;
  imgIds: number[];
  userPhotos?: File[]
  description: string;
  city: City;
  isAdmin: boolean;

  constructor() {
    this.imgIds = [];
  }
}
