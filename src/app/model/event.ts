import {User} from "./user";
import {UserDto} from "./userDto";


export class Event {
  id?: number;
  title: string;
  description: string;
  city: string;
  createUser: UserDto;
  subscribers: UserDto[];
  eventCreatedDate: Date;
}
