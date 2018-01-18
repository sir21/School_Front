import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { templateSourceUrl } from '@angular/compiler';

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

  notFill: boolean = false;

  constructor(private fb: FormBuilder) {
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
  }

  ngOnInit() {
  }

}
