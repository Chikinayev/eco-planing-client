import {EventDto} from "./eventDto";
import {EventFilterPage} from "./eventFilterPage";
import {UserDto} from "./userDto";

export class ReturnFilter {
  eventDtoList: EventDto[];
  userDtos: UserDto[];
  filter: EventFilterPage;
}
