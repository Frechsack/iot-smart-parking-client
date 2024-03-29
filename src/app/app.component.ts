import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iot-smart-parking-client';

  constructor(
    private router: Router
  ){
  }


  navigateTo(value: any) {
    this.router.navigate([value]);
  }
}
