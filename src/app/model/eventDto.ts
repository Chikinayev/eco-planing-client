import {User} from "./user";
import {UserDto} from "./userDto";


export class EventDto {
  id?: number;
  title: string;
  description: string;
  city: string;
  createUser: UserDto;
  subscribers?: UserDto[];
  eventCreatedDate: Date;
  eventDay: Date;
  constructor() {
  }
}
