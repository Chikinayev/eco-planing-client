import { Component } from '@angular/core';
import {EventController} from "../../controller/eventController";
import {Router} from "@angular/router";
import {tap} from "rxjs";
import {EventList} from "../../model/eventList";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  find: string;

  constructor(private readonly eventController: EventController,
              private readonly router: Router) {
  }

  getEvent() {
    this.eventController.getEventByName(this.find)
      .pipe(
        tap(value => {
          if (value){
            const queryParams = value;
            console.log('6666', value)
            this.router.navigate(['/main'],{queryParams}).then()
          }
          })
      )
      .subscribe();
  }


}
