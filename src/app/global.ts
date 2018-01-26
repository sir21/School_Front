import { Injectable } from '@angular/core';

Injectable()

export class Global{
    isAdmin: boolean = false;
    isLogin: boolean = false;
    isAccepted: boolean = false;
    currentUser: string = '';
}