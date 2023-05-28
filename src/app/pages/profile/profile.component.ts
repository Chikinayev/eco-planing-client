import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";
import {UserDto} from "../../model/userDto";
import {FileController} from "../../controller/fileController";
import {EventController} from "../../controller/eventController";
import {Event} from "../../model/event";
import {EventList} from "../../model/eventList";
import {SubSink} from "../../util/SubSink";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy{

  profile: UserDto;
  images: File[];
  events: EventList[];
  private readonly subs = new SubSink();
  @ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(private readonly route: ActivatedRoute,
              private readonly fileController: FileController,
              private readonly eventController: EventController,
              private readonly router: Router) {
    this.images = [];
    this.events = [];

    console.log('wwwww');
    this.subs.sink =  route.queryParams.pipe(
      tap(value => {
        this.profile = value as UserDto;
        this.getImageProfile();
        this.getEvents();
      })
    ).subscribe();
  }

  getImageProfile() {
    if (this.profile.imgIds !== null && this.profile.imgIds !== undefined) {
      console.log('1111')
      for (let i = 0; i < this.profile.imgIds.length; i++) {
        console.log('222',this.profile.imgIds[i]);
        this.subs.sink = this.fileController.downloadFile(this.profile.imgIds[i].toString()).pipe(
          tap(value => {
            this.images.push(new File([value.body], 'asd'))
          })
        ).subscribe();
      }
    }
  }

  getEvents() {
      console.log('1111')
        console.log('221232',this.profile);
        this.eventController.getEventById(this.profile.id).pipe(
          tap(value => {
            if (!!value) {
              this.events = value;
            }
          })
        ).subscribe();
  }


  onFileSelected(event: any) {
    console.log('2222')
  const filesList: FileList = event.target.files;
  if (!this.images) {
    this.images = [];
  }
  for (let i = 0; i < filesList.length; i++) {
    const file: File | null = filesList.item(i);
    if (file) {
      this.images.push(file);
      this.fileController.uploadFile(file).subscribe();
    }
  }
    if (this.fileInputRef) {
      this.fileInputRef.nativeElement.value = '';
    }

  // console.log('www :: ', this.user);
  console.log('rrr :: ', this.images);
  }

    delImageUrl(file: File) {
    if (this.images){
      this.images = this.images.filter(value => value.name != file.name);
    }
  }


  getImageUrl(file: File): string {
    console.log('ppp :: ', file);
    return URL.createObjectURL(file);
  }

  createEvent() {
    this.router.navigate(['event']).then();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
