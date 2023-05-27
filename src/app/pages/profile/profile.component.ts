import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs";
import {UserDto} from "../../model/userDto";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  profile: UserDto;

  constructor(private readonly route: ActivatedRoute) {

    console.log('wwwww');
    route.queryParams.pipe(
      tap(value => {
        this.profile = value as UserDto;
        console.log('ttttss :: ', value);
        console.log('qweeewq :: ', this.profile);
      })
    ).subscribe();
  }



}
