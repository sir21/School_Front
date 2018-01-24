import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Global } from './global';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  isLoggedIn: boolean = false;

  constructor(private global: Global,
              private authenticate: AuthenticationService,
              private httpClient: HttpClient
            ){
    this.isLoggedIn = global.isLogin;
  }

  logout(){
    this.httpClient.post('http://localhost:1816/api/login/logout', {
      email: this.global.currentUser,
      password: localStorage.getItem('userToken')
    })
    .subscribe(
      (data:any) => {
        this.authenticate.saveLogout();
      }
    )
  }
}
