import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component
({
  // tslint:disable-next-line:component-selector
  selector: 'success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})

export class SuccessComponent
{
  constructor(public authService: AuthService)
  {

  }
}
