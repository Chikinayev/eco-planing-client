import {AfterViewInit, Component} from '@angular/core';
import {EventDto} from "../../model/eventDto";
import {EventFilterPage} from "../../model/eventFilterPage";
import {EventController} from "../../controller/eventController";
import {FileController} from "../../controller/fileController";
import {LoginServices} from "../../services/login.services";
import {Router} from "@angular/router";
import {tap} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-reverse-main',
  templateUrl: './reverse-main.component.html',
  styleUrls: ['./reverse-main.component.scss']
})
export class ReverseMainComponent implements AfterViewInit{

  eventList: EventDto[] = [];

  filter: EventFilterPage;

  constructor(private readonly eventController: EventController,
              private readonly fileController: FileController,
              private readonly loginServices: LoginServices,
              private readonly router: Router) {
    this.filter = new EventFilterPage();
    this.init();
  }

  init() {
    this.eventController.getEventReverseByFilter(this.filter)
      .pipe(
        tap(value => {
          if (value) {
            this.eventList = value.eventDtoList;
            this.filter.totalItems = value.filter.totalItems;
            this.filter.currentPage = value.filter.currentPage;

            this.downloadFile();
          }
        })
      )
      .subscribe();
  }


  downloadFile() {
    for (let i = 0; i < this.eventList.length; i++){
      if (!!this.eventList[i].imageId){
        this.fileController.downloadFile(this.eventList[i].imageId.toString())
          .pipe(
            tap(
              value => {
                if (!this.eventList[i].eventPhotos){
                  this.eventList[i].eventPhotos = [];
                }
                this.eventList[i].eventPhotos.push(new File([value.body], 'asd'));
              }
            )
          )
          .subscribe();
      }

    }
  }
  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  subscribe(id: number) {
    const user =  this.loginServices.authInfo;
    this.eventController.subscribe(user.id, id).pipe(
      tap(value => {
        this.init();
      })
    ).subscribe();

  }


  getEvent(id: number) {
    const queryParams = {id: id};
    this.router.navigate(['event-info'], {queryParams}).then();
  }
  onPageChange(event: PageEvent) {
    this.filter.currentPage = event.pageIndex;
    this.filter.pageSize = event.pageSize;

    // this.eventController.getEventById().subscribe();
    this.init();

  }

  ngAfterViewInit(): void {
    this.init();

  }

  search() {
    this.filter.currentPage = 0;
    this.init();
  }
}
