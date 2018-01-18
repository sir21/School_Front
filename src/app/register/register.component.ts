import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { element } from 'protractor';
import { FormControl } from '@angular/forms/src/model';

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

  constructor(private fb: FormBuilder) { 
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

  checkPassword(){
    if(this.password == this.cpassword){
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
  }
}
