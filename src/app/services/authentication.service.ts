import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Global } from '../global';

@Injectable()
export class AuthenticationService {

  constructor(private global: Global) { }

  saveLogin(username: string, token: string, isAdmin: boolean, isAccepted: boolean){
    console.log(username);
    console.log(token);
    console.log(String(isAdmin));
    localStorage.setItem('currentUser', username);
    localStorage.setItem('userToken', token);
    localStorage.setItem('isAdmin', String(isAdmin));
    localStorage.setItem('isLogin', 'true');
    localStorage.setItem('isAccepted', String(isAccepted));
  }

  saveLogout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('isAccepted');
    this.global.isLogin = false;
    this.global.isAdmin = false;
    this.global.currentUser = '';
    console.log('logout done!');
  }

}
