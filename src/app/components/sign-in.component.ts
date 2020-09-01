import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {passwordMatch} from '../validation/password.validation';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent
{

  loginForm;

  constructor(public authService: AuthService, private formBuilder: FormBuilder)
  {
    this.loginForm = this.formBuilder.group
    (
      {
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required],
      }
    );
  }

  isInvalid(control): any
  {
    return this.loginForm.controls[control].invalid &&
      this.loginForm.controls[control].touched;
  }

  isEmpty(control): any
  {
    return this.loginForm.value[control] === '';
  }

  isRequiredFormEmpty(): any
  {
    return this.isEmpty('email') ||
      this.isEmpty('password');
  }

  isIncomplete(): any
  {
    return this.isInvalid('email') ||
      this.isInvalid('password') ||
      this.isRequiredFormEmpty();
  }

  signIn(): void
  {
    this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password);
  }
}
