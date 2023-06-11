import {Component} from '@angular/core';
import {UserDto} from "../../model/userDto";
import {EventFilterPage} from "../../model/eventFilterPage";
import {PageEvent} from "@angular/material/paginator";
import {tap} from "rxjs";
import {FileController} from "../../controller/fileController";
import {LoginServices} from "../../services/login.services";
import {UserController} from "../../controller/UserController";
import {Router} from "@angular/router";

@Component({
  selector: 'app-volunters-list',
  templateUrl: './volunters-list.component.html',
  styleUrls: ['./volunters-list.component.scss']
})
export class VoluntersListComponent {

  users: UserDto[];
  isAdmin: boolean = false;
  filter: EventFilterPage = new EventFilterPage();

  constructor(private readonly userController: UserController,
              private readonly fileController: FileController,
              private readonly loginService: LoginServices,
              private readonly router: Router) {
    this.filter.pageSize = 6;
    this.getUser();
    this.init();
  }


  getUser() {
    this.loginService.init().then(
      () => {
        this.isAdmin = this.loginService.authInfo.isAdmin;
      }
    )
  }
  init() {
    this.userController.getAllUsers(this.filter)
      .pipe(
        tap((value)=> {
          this.users =value.userDtos;
          this.filter.totalItems = value.filter.totalItems;
          this.filter.currentPage = value.filter.currentPage;

          this.downloadFile();


        })).subscribe();
  }


  downloadFile() {
    for (let i = 0; i < this.users.length; i++){
      if (!!this.users[i].imgIds){
        this.fileController.downloadFile(this.users[i].imgIds[0].toString())
          .pipe(
            tap(
              value => {
                if (!this.users[i].userPhotos){
                  this.users[i].userPhotos = [];
                }
                this.users[i].userPhotos.push(new File([value.body], 'asd'));
              }
            )
          )
          .subscribe();
      }

    }
  }


  onPageChange(event: PageEvent) {
    this.filter.currentPage = event.pageIndex;
    this.filter.pageSize = event.pageSize;
    this.init();
  }

  getImageUrl(file: File) {
    return URL.createObjectURL(file);
  }

  deleteUser(userID: number) {
    this.userController.deleteUser(userID)
      .pipe(
      tap(()=> this.init())
      )
      .subscribe();
  }
  enterUser(id: number) {
    const queryParams = {id: id};
    this.router.navigate(['profile'], {queryParams}).then();
  }
}
