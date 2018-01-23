import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { templateSourceUrl } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

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

  notFill: boolean = false;

  constructor(private fb: FormBuilder, private httpClient:HttpClient) {
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

    this.httpClient.post('http://localhost:1816/api/login/login', {
      email: this.email,
      password: this.password
    })
    .subscribe(
      (data:any) => {
        console.log(data);
        this.loginMessage = this.sucsessLogin;
      },
      (err:any) => {
        console.log(err);
        this.loginMessage = this.failedLogin;
      }
    )
  }

  ngOnInit() {
  }

}
