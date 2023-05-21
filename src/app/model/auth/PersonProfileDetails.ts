import {Image} from "../image";
import {Role} from "../role";
import {Event} from "../event";

export class PersonProfileDetails {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  images: Image[];
  rating: number;
  role: Role;
  subscriptions: Event[];

}
