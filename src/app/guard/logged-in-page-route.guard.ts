import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { AuthService} from '../auth.service';
import { Observable } from 'rxjs';

@Injectable
(
  {
    providedIn: 'root'
  }
)

// TODO watch https://www.youtube.com/watch?v=WveRq-tlb6I

export class LoggedInPageRouteGuard implements CanActivate
{
  constructor(private auth: AuthService, public router: Router)
  {
  }

  // Will stop logged in users from accessing some pages
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean
  {
    if (this.auth.isLoggedIn === true)
    {
      // return false;
      this.router.navigate(['']);
    }
    return true;
  }
}
