import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Global } from '../global';

@Injectable()
export class AuthenticationService {

  constructor(private global: Global) { }

  saveLogin(username: string, token: string, isAdmin: boolean){
    console.log(username);
    console.log(token);
    console.log(String(isAdmin));
    localStorage.setItem('currentUser', username);
    localStorage.setItem('userToken', token);
    localStorage.setItem('isAdmin', String(isAdmin));
    localStorage.setItem('isLogin', 'true');
  }

  saveLogout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLogin');
    this.global.isLogin = false;
    this.global.isAdmin = false;
    this.global.currentUser = '';
    console.log('logout done!');
  }

}
