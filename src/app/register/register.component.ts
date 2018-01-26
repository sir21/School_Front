import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { element } from 'protractor';
import { FormControl } from '@angular/forms/src/model';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';

import { Global } from '../global';
import { AuthenticationService } from '../services/authentication.service';
import { delay } from 'rxjs/operator/delay';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  [x: string]: any;
  rForm: FormGroup;
  post: any;
  fname: string = '';
  lname: string = '';
  addressLine_1: string = '';
  addressLine_2: string = '';
  addressLine_3: string = '';
  guardian: string = '';
  dob: Date = new Date(0,0,0);
  email: string = '';
  password: string = '';
  cpassword: string = '';

  passwordMatching: boolean = false;
  notFill: boolean = false;

  fnameAlert: string = 'First name is required';
  lnameAlert: string = 'Last name is required';
  addressAlert: string = 'Address is required';
  guardianAlert: string = 'Guardian is rquired';
  emailAlert: string = 'This field is requiered';
  passwordAlert: string = 'Password is required';
  cpasswordAlert: string = 'Confirm password is required';
  dobAlert: string = 'Enter Date of Birth';
  cpasswordAlert_1: string = 'Need to be matched with password';

  successRegistration: string = 'Successfully registered';
  failedRegistration: string = 'Failed regstration';
  registrationMessage: string ='';

  constructor(private fb: FormBuilder,
              private httpClient:HttpClient,
              private router: Router,
              private global: Global,
              private authenticate: AuthenticationService
  ) { 
    this.rForm = fb.group({
      'fname': [null, Validators.required],
      'lname': [null, Validators.required],
      'addressLine_1': [null, Validators.required],
      'addressLine_2': [null, Validators.required],
      'addressLine_3': [null, Validators.required],
      'guardian': [null, Validators.required],
      'dob': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.min(6)])],
      'cpassword': [null, Validators.compose([Validators.required, Validators.min(6)])],
    })
  }

  ngOnInit() {
  }

  checkPassword(post){
    console.log(post.password);
    console.log(post.cpassword);
    if(post.password == post.cpassword){
      this.passwordMatching = true;
    }
    else{
      this.passwordMatching = false;
    }
  }

  addPost(post){
    if(this.rForm.invalid)
      this.notFill = true;
    else
      this.notFill = false;

    if(!this.notFill)
      this.registerCall(post);
  }

  registerCall(post) {
    this.fname = post.fname;
    this.lname = post.lname;
    this.addressLine_1 = post.addressLine_1;
    this.addressLine_2 = post.addressLine_2;
    this.addressLine_3 = post.addressLine_3;
    this.guardian = post.guardian;
    this.dob = post.dob;
    this.email = post.email;
    this.password = post.password;
    this.cpassword = post.cpassword;

    this.httpClient.post('http://localhost:1816/api/login/register', {
      firstName: this.fname,
      lastName: this.lname,
      address1: this.addressLine_1,
      address2: this.addressLine_2,
      address3: this.addressLine_3,
      guardian: this.guardian,
      dateOfBirth: this.dob,
      email: this.email,
      password: this.password,
      confirmPassword: this.cpassword
    })
    .subscribe(
      (data:any) => {
        this.onSuccess(data);
      },
      (err:any) => {
        this.onError(err);
      }
    )
  }

  onSuccess(data){
    console.log(data);
    this.registrationMessage = this.successRegistration;
    this.router.navigate(['login']);
  }

  onError(err){
    console.log(err);
    this.registrationMessage = this.failedRegistration;
  }
}
