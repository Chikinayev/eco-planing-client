import {Role} from "./role";
import {Image} from "./image";
import {City} from "./city";

export class User {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName?: string;
  rating?: number;
  password: string;
  roles: Role[];
  city: City;

  constructor() {
    this.roles = []
  }
}
