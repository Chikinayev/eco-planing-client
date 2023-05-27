import {Role} from "./role";
import {Image} from "./image";

export class User {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName?: string;
  rating?: number;
  password: string;
  roles: Role[];
  city: string;

  constructor() {
    this.roles = []
  }
}
