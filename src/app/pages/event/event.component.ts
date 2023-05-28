import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Event} from "../../model/event";
import {SubSink} from "../../util/SubSink";
import {LoginServices} from "../../services/login.services";
import {tap} from "rxjs";
import {UserDto} from "../../model/userDto";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnDestroy{
  event: Event;

  private readonly subs = new SubSink();
  currentUser: UserDto;

  constructor(private readonly route: ActivatedRoute,
              private readonly loginService: LoginServices) {
    this.loginService.user$.pipe(
      tap(value => {
        console.log('ssss :: ', value);
        this.currentUser = value as UserDto;

      })
    ).subscribe();

    this.init();
  }

  init() {
    this.subs.sink = this.route.queryParams.pipe(
      tap(value => {
        console.log('asss', value);
        if (!!value) {
          console.log('iiii :: ', value);
          this.event = value as Event;
        } else {
          console.log('asd')
          this.event = new Event();
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  createEvent() {
    this.event.createUser = this.currentUser;
    this.event.eventCreatedDate = new Date();
    console.log('Created Event:', this.event);

  }
}
