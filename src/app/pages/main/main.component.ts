import { Component } from '@angular/core';
import {EventList} from "../../model/eventList";
import {EventDto} from "../../model/eventDto";
import {EventController} from "../../controller/eventController";
import {tap} from "rxjs";
import {LoginServices} from "../../services/login.services";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  eventList: EventDto[] = [];
  constructor(private readonly eventController: EventController,
              private readonly loginServices: LoginServices) {
    this.init();
  }

  init() {
    this.eventController.getAllEvent()
      .pipe(
        tap(value => {
          if (value) {
            console.log('addd ', value);
            this.eventList = value;
          }
        })
      )
      .subscribe();
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



}

