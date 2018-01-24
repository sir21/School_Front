import { Component } from '@angular/core';

import { Global } from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  isLoggedIn: boolean = false;

  constructor(private global: Global){
    this.isLoggedIn = global.isLogin;
  }
}
