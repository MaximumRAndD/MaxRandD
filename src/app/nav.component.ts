import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component(
  {
  selector: 'navagation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent
{
  constructor(public authService: AuthService)
  {
  }
}
