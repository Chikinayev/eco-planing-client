import {Injectable} from "@angular/core";
import {HttpService} from "../lib/http.service";
import {EventDto} from "../model/eventDto";
import {EventList} from "../model/eventList";

@Injectable({ providedIn: 'root' })

export class EventController{

  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('event')
  }

  getEventById(eventId: number) {
    return this.http.toPostService0<EventList[]>('eventListByID', eventId);
  }

  getEventDtoById(eventId: number) {
    return this.http.toPostService0<EventDto>('eventDtoByID', eventId);
  }
  saveEvent(event: EventDto) {
    return this.http.toPostService0<void>('saveEvent', event);
  }

  getAllEvent() {
    return this.http.toPostService0<EventDto[]>('getEvents');
  }

  subscribe(userId:number, eventId:number) {
    console.log('222')
    return this.http.toPostService0<void>('subscribe', {userId: userId, eventId: eventId});
  }

  delEvent(userId:number, eventId:number) {
    return this.http.toPostService0<void>('deleteEvent', {userId: userId, eventId: eventId});
  }


}
