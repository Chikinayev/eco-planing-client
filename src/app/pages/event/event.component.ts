import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventDto} from "../../model/eventDto";
import {SubSink} from "../../util/SubSink";
import {LoginServices} from "../../services/login.services";
import {tap} from "rxjs";
import {UserDto} from "../../model/userDto";
import {WebAuthController} from "../../controller/WebAuthController";
import {EventController} from "../../controller/eventController";
import {catchError} from "rxjs/operators";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnDestroy{
  event: EventDto = new EventDto();

  private readonly subs = new SubSink();
  currentUser: UserDto;

  constructor(private readonly route: ActivatedRoute,
              private readonly loginService: LoginServices,
              private readonly eventController: EventController,
              private readonly router: Router) {

    this.init();
  }

  init() {
    this.subs.sink = this.route.queryParams.pipe(
      tap(value => {
        if (Object.keys(value).length !== 0) {
          this.event = value as EventDto;
        } else {
          this.event = new EventDto();
        }
      })
    ).subscribe();
    this.loginService.user$.pipe(
      tap(value => {
        this.currentUser = value as UserDto;

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
    this.eventController.saveEvent(this.event)
      .pipe(
        tap(value => {
            this.router.navigate(['profile']).then();
        })
      )
      .subscribe();
  }
}
