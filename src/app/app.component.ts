import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activated: boolean;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.activatedEventEmitter.subscribe(
      (data: boolean) => {
        this.activated = true;
        console.log('activated');
      }
    );
  }
}
