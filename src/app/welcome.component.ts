import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component
  ({
    selector: 'welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
  })

export class WelcomeComponent
{
  constructor(public authService: AuthService)
  {
  }
}
