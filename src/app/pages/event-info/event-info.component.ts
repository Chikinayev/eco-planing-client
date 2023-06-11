import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs";
import {EventController} from "../../controller/eventController";
import {SubSink} from "../../util/SubSink";
import {EventDto} from "../../model/eventDto";
import {FileController} from "../../controller/fileController";

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent {

  id: number;
  eventDto:EventDto = new EventDto();
  formattedDate: string;
  formattedTime: string;

  private readonly subs = new SubSink();
  constructor(private readonly route: ActivatedRoute,
              private readonly fileController: FileController,
              private readonly eventController: EventController,
              ) {
    this.init();
  }

  init() {
    this.subs.sink = this.route.queryParams.pipe(
      tap(value => {
        if (value){
          this.id = value['id'];
          this.getEvent(this.id);
        }
      })
    ).subscribe()
  }



  getFormattedDate() {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    this.formattedDate = new Date(this.eventDto.eventDay).toLocaleDateString('ru-RU', options);
  }

  getFormattedTime() {
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
    this.formattedTime = new Date(this.eventDto.eventDay).toLocaleTimeString('ru-RU', options);
  }
  getEvent(id: number) {
    this.subs.sink = this.eventController.getEventDtoById(id).pipe(
      tap(value => {
        this.eventDto = value;
        this.downloadFile();
        this.getFormattedDate();
        this.getFormattedTime();
      })
    ).subscribe();
  }

  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  downloadFile() {
      if (this.eventDto.imageId){
        this.fileController.downloadFile(this.eventDto.imageId.toString())
          .pipe(
            tap(
              value => {
                if (!this.eventDto.eventPhotos){
                  this.eventDto.eventPhotos = [];
                }
                this.eventDto.eventPhotos.push(new File([value.body], 'asd'));
              }
            )
          ).subscribe();
      }


  }

}
