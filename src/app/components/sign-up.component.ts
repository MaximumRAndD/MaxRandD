import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatch } from '../validation/password.validation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent
{

  signUpForm;

  constructor(public authService: AuthService, private formBuilder: FormBuilder)
  {
    this.signUpForm = this.formBuilder.group
    (
      {
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
      },
      {
        validators: [passwordMatch('password', 'passwordConfirm')]
      }
    );
  }

  // 4 methods below will check if the 'submit' btn should be used
  isInvalid(control): any
  {
    return this.signUpForm.controls[control].invalid &&
      this.signUpForm.controls[control].touched;
  }

  isEmpty(control): any
  {
    return this.signUpForm.value[control] === '';
  }

  isRequiredFormEmpty(): any
  {
    return this.isEmpty('email') ||
      this.isEmpty('password') ||
      this.isEmpty('passwordConfirm');
  }

  passMatch(): any
  {
    if (this.signUpForm.value.password === this.signUpForm.value.passwordConfirm)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  isIncomplete(): any
  {
    return this.isInvalid('email') ||
      this.isInvalid('password') ||
      this.isInvalid('passwordConfirm') ||
      this.isRequiredFormEmpty() ||
      this.passMatch();
  }

  signUp(): void
  {
    this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password);
  }

  test(): any
  {

  }

}
