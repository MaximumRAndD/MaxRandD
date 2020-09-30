import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit
{

  email;

  constructor(public authService: AuthService, private formBuilder: FormBuilder)
  {
    this.email = this.formBuilder.group
    (
      {
        email: ['', [Validators.required, Validators.email]]
      }
    );
  }

  ngOnInit(): void
  {
  }

  // 4 methods below will check if the 'submit' btn should be used
  isInvalid(control): any
  {
    return this.email.controls[control].invalid &&
      this.email.controls[control].touched;
  }

  isEmpty(control): any
  {
    return this.email.value[control] === '';
  }

  isRequiredFormEmpty(): any
  {
    return this.isEmpty('email');
  }

  isIncomplete(): any
  {
    return this.isInvalid('email') ||
      this.isRequiredFormEmpty();
  }

  sendReset(): void
  {
    this.authService.forgotPassword(this.email.value.email);
  }

}
