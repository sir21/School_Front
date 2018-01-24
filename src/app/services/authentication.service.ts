import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Global } from '../global';

@Injectable()
export class AuthenticationService {

  constructor(private global: Global) { }

  saveLogin(username: string, token: string){
    console.log(username);
    console.log(token);
    localStorage.setItem('currentUser', JSON.stringify(username));
    localStorage.setItem('userToken', JSON.stringify(token));
  }

  saveLogout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    this.global.isLogin = false;
    this.global.currentUser = '';
    console.log('logout done!');
  }

}
