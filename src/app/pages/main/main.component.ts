import { Component } from '@angular/core';
import {EventList} from "../../model/eventList";
import {EventDto} from "../../model/eventDto";
import {EventController} from "../../controller/eventController";
import {tap} from "rxjs";
import {LoginServices} from "../../services/login.services";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {FileController} from "../../controller/fileController";
import {PageEvent} from "@angular/material/paginator";
import {FilterPage} from "../../model/FilterPage";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  eventList: EventDto[] = []; // Ваш массив событий


  // pagedEventList: any[] = []; // Массив отображаемых событий на текущей странице
  // totalItems = 11; // Общее количество элементов
  // pageSize = 8; // Количество элементов на странице
  // currentPage = 10;

  filter: FilterPage = new FilterPage();




  constructor(private readonly eventController: EventController,
              private readonly fileController: FileController,
              private readonly loginServices: LoginServices,
              private readonly router: Router) {
    this.init();
  }

  init() {
    console.log('444444')
    this.eventController.getAllEvent()
      .pipe(
        tap(value => {
          if (value) {
            console.log('addd ', value);
            this.eventList = value;
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
    console.log('ppp :: ', file);
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
    this.filter.currentPage = event.pageIndex;
    this.filter.pageSize = event.pageSize;

    // this.eventController.getEventById().subscribe();

    console.log('qwe')
    this.updatePagedEventList();
  }
  updatePagedEventList() {
    const startIndex = this.filter.currentPage * this.filter.pageSize;
    // this.filter.pagedEventList = this.eventList.slice(startIndex, startIndex + this.filter.pageSize);
  }

}

