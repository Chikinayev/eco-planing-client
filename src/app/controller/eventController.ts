import {Injectable} from "@angular/core";
import {HttpService} from "../lib/http.service";
import {EventDto} from "../model/eventDto";
import {EventList} from "../model/eventList";
import {EventFilterPage} from "../model/eventFilterPage";
import {ReturnFilter} from "../model/returnFilter";

@Injectable({ providedIn: 'root' })

export class EventController{

  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('event')
  }

  getEventById(eventId: number) {
    return this.http.toPostService0<EventList[]>('eventListByID', eventId);
  }

  getEventByFilter(filterPage: EventFilterPage) {
    return this.http.toPostService0<ReturnFilter>('getEventByFilter', filterPage);
  }

  getEventByName(find: string) {
    return this.http.toPostService0<EventList[]>('getEventByName', find);
  }

  getEventDtoById(eventId: number) {
    return this.http.toPostService0<EventDto>('eventDtoByID', eventId);
  }
  saveEvent(event: EventDto) {
    return this.http.toPostService0<number>('saveEvent', event);
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

  // saveMultipart(keyValue: any) {
  //   const input = new FormData();
  //   for (const key of Object.keys(keyValue)) {
  //     const value = keyValue[key];
  //     if (value !== undefined && value !== null) {
  //       console.log('qqqq :: ', key);
  //       console.log('aaaaa :: ', typeof value);
  //       input.append(key, value);
  //     }
  //   }
  //   console.log('qqqqq');
  //   return this.http.toPostFileService<void>('saveEvent', input);
  // }


  saveMultipart(file: File, id:number) {
    const input = new FormData();
    input.append('file', file, file.name);
    input.append('id', id.toString());

    console.log('qqqqq');
    return this.http.toPostFileService<void>('uploadEvent', input);
  }



  // saveMultipart(eventDto:EventDto, file: File) {
  //   const input = new FormData();
  //   input.append('file', file, file.name);
  //
  //   return this.http.toPostService0<void>('saveEvent', {eventDto, input});
  // }


}
