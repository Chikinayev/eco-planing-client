import {Image} from "./image";
import {User} from "./user";


export class Event {
  id?: number;
  title: string;
  description: string;
  city: string;
  createUser: User;
    subscribers: User[];
    eventCreatedDate: Date;
}
