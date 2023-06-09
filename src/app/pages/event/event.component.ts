import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventDto} from "../../model/eventDto";
import {SubSink} from "../../util/SubSink";
import {LoginServices} from "../../services/login.services";
import {tap} from "rxjs";
import {UserDto} from "../../model/userDto";
import {WebAuthController} from "../../controller/WebAuthController";
import {EventController} from "../../controller/eventController";
import {catchError, map} from "rxjs/operators";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnDestroy{
  event: EventDto = new EventDto();
  eventPhotos: File;
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
    this.subs.sink = this.loginService.user$.pipe(
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
    // this.event.eventDay = this.event.eventDay;
    console.log('Created Event:', this.event);
    this.eventController.saveEvent(this.event)
      .pipe(
        map(value => {
          console.log('qqq :: ', value);
          console.log('www :: ', )
          if (!!this.eventPhotos){
            return this.eventController.saveMultipart(this.eventPhotos, value).subscribe();
          }
          this.router.navigate(['profile']).then();
        })
      )
      .subscribe();
  }

  onFileSelected(event: any) {
    const filesList: FileList = event.target.files;
    const file: File | null = filesList.item(0);
    if (file) {
      this.eventPhotos = file;
    }
  }

  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }



}
