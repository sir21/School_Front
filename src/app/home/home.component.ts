import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';

import { AppComponent } from './../app.component';
import { logging } from 'selenium-webdriver';
import { Global } from '../global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  constructor(private httpClient:HttpClient,
              private global: Global
  ) {}

  ngOnInit() {
    this.httpClient.get('http://localhost:1816/api/Home/index')
    .subscribe(
      (data:any[]) =>{
        console.log(data);
      }
    )
  }
}
