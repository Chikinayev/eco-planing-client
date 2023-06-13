import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";
import {UserDto} from "../../model/userDto";
import {FileController} from "../../controller/fileController";
import {EventController} from "../../controller/eventController";
import {EventList} from "../../model/eventList";
import {SubSink} from "../../util/SubSink";
import {LoginServices} from "../../services/login.services";
import {UserController} from "../../controller/UserController";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy{

  profile: UserDto = new UserDto();
  images: File[] = [];
  events: EventList[] = [];
  homePage: boolean = false;
  private readonly subs = new SubSink();
  @ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(private readonly fileController: FileController,
              private readonly eventController: EventController,
              private readonly userController: UserController,
              private readonly router: Router,
              private readonly loginService: LoginServices,
              private readonly route: ActivatedRoute) {

    this.init();
  }


  init() {
    this.route.queryParams.pipe(
      tap(value => {
        if (!!value['id'] && !value['email']){
          console.log('DDfpR5IfKk :: ', value['id'])
          this.getUser(value['id']);
        } else {
          this.loginService.init().then(
            value => {
              this.profile = this.loginService.authInfo;
              this.images = [];
              this.homePage = true;
              this.getImageProfile();
              if(this.profile.isOrganizer) {
                this.getEvents();
              } else {
                this.subscribe();
              }
            }
          )
        }
      })
    ).subscribe()
  }

  getImageProfile() {
    if (this.profile.imgIds !== null && this.profile.imgIds !== undefined) {
      for (let i = 0; i < this.profile.imgIds.length; i++) {
        this.subs.sink = this.fileController.downloadFile(this.profile.imgIds[i].toString()).pipe(
          tap(value => {
            if(this.profile.imgIds.length >= this.images.length) {
              this.images.push(new File([value.body], 'asd'))
            }
          })
        ).subscribe();
      }
    }
  }

  getEvents() {
        this.eventController.getEventById(this.profile.id).pipe(
          tap(value => {
            if (!!value) {
              this.events = value;
            }
          })
        ).subscribe();
  }


  onFileSelected(event: any) {
  const filesList: FileList = event.target.files;
  if (!this.images) {
    this.images = [];
  }
  for (let i = 0; i < filesList.length; i++) {
    const file: File | null = filesList.item(i);
    if (file) {
      this.images.push(file);
      this.subs.sink = this.fileController.uploadFile(file).subscribe();
    }
  }
    if (this.fileInputRef) {
      this.fileInputRef.nativeElement.value = '';
    }

  }

    delImageUrl(file: File) {
    if (this.images){
      this.images = this.images.filter(value => value.name != file.name);
    }
    this.subs.sink = this.fileController.deleteFile(this.profile.id).subscribe();
  }


  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  createEvent() {
    this.router.navigate(['event']).then();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  delEvent(eventId: number) {
    this.subs.sink = this.eventController.delEvent(this.profile.id, eventId).pipe(
      tap(value => {
        this.init();
      })
    ).subscribe();
  }

  private getUser(id: number) {
    this.userController.getUserById(id).pipe(
      tap(value => {
        this.profile = value;
        this.images = [];
        this.homePage = false;

        this.getImageProfile();
        this.getEvents();
      })
    ).subscribe();
  }

  public changeEvent(id: number) {
    const queryParams = {id: id};
    this.router.navigate(['event'], {queryParams}).then();
  }

  private subscribe() {
    this.eventController.getEventSubscribeByUser(this.profile.id)
      .pipe(tap(value => {
        if (!!value) {
          this.events = value;
          console.log('3nzpvjQJNU :: ', value)
        }
      }))
      .subscribe()


  }
}
