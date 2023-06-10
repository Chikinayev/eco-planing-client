import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {EventList} from "../../model/eventList";
import {EventDto} from "../../model/eventDto";
import {EventController} from "../../controller/eventController";
import {filter, tap} from "rxjs";
import {LoginServices} from "../../services/login.services";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {FileController} from "../../controller/fileController";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {EventFilterPage} from "../../model/eventFilterPage";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit{

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
    console.log('444444')
    this.eventController.getEventByFilter(this.filter)
      .pipe(
        tap(value => {
          if (value) {
            console.log('addd ', value);
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
      console.log('333333', this.eventList.length)
      if (!!this.eventList[i].imageId){
        console.log('2222')
        this.fileController.downloadFile(this.eventList[i].imageId.toString())
          .pipe(
            tap(
              value => {
                console.log('qqqqq')
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
    console.log('111 ', user);
    console.log('aaa', id)
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
    console.log('11111233')
    this.filter.currentPage = event.pageIndex;
    this.filter.pageSize = event.pageSize;

    // this.eventController.getEventById().subscribe();
    this.init();

    console.log('qwe')
  }

  ngAfterViewInit(): void {
    this.init();

  }

  search() {
    this.filter.currentPage = 0;
    this.init();
  }
}

