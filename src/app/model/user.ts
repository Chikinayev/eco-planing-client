import {Image} from "./image";
import {Role} from "./role";

export class User {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName?: string;
  images?: File[];
  rating?: number;
  password: string;
  role: Role;
  city: string;

}
