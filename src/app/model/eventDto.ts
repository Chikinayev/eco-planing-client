import {User} from "./user";
import {UserDto} from "./userDto";


export class EventDto {
  id?: number;
  title?: string;
  description?: string;
  city?: string;
  createUser?: UserDto;
  subscribers?: UserDto[];
  subscribersCount?: number;
  eventCreatedDate?: Date;
  eventDay?: Date;
  eventPhotos?: File[];
  imageId?: number;
  imageUrl?: string;
  constructor() {
  }
}
