import {Injectable} from "@angular/core";
import {HttpService} from "../lib/http.service";
import {Event} from "../model/event";
import {EventList} from "../model/eventList";

@Injectable({ providedIn: 'root' })

export class EventController{

  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('event')
  }

  getEventById(eventId: number) {
    return this.http.toPostService0<EventList[]>('eventsByID', eventId);
  }



}
