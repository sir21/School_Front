import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { templateSourceUrl } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay } from 'q';
import { AppComponent } from '../app.component';
import { RouterModule, Routes, Router } from '@angular/router';

import { Global } from '../global';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;
  post: any;
  email: string = '';
  password: string = '';
  emailAlert: string = 'This field is requiered';
  passwordAlert: string = 'Password is required';

  sucsessLogin: string = 'Login is a success';
  failedLogin: string = 'Login is a Fail';
  loginMessage: string = '';
  rUname: string = '';
  rToken: string ='';  

  notFill: boolean = false;

  constructor(private fb: FormBuilder, 
              private httpClient:HttpClient,
              private router: Router,
              private global: Global,
              private authenticate: AuthenticationService) {
    this.rForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required]
    })
  }

  addPost(post){
    if(this.rForm.invalid)
      this.notFill = true;
    else
      this.notFill = false;

    if(!this.notFill)
      this.loginCall(post);
  }

  loginCall(post) {
    this.email = post.email;
    this.password = post.password;

    //var httpHeaders: any = new HttpHeaders({ 'RequestVerificationToken': localStorage.getItem('token') });

    this.httpClient.post('http://localhost:1816/api/login/login', {
      email: this.email,
      password: this.password
    })
    .subscribe(
      (data:any) => {
        this.onSuccess(data);
      },
      (err:any) => {
        console.log(err);
        this.loginMessage = this.failedLogin;
      }
    )
  }

  ngOnInit() {
  }

  onSuccess(data){
    console.log(data);
    this.loginMessage = this.sucsessLogin;
    this.global.isLogin = true;
    this.global.currentUser = data.email;
    this.authenticate.saveLogin(data.email, data.token);
    this.router.navigate(['home']);
  }

}
