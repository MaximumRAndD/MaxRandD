import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { AuthService} from '../auth.service';
import { Observable } from 'rxjs';

@Injectable
(
  {
    providedIn: 'root'
  }
)

export class LoggedInRouteGuard implements CanActivate
{
  constructor(private auth: AuthService, public router: Router)
  {
  }

  // Will stop non-logged in users from accessing some pages
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    // Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    Observable<boolean> | Promise<boolean> | boolean
  {
    if (this.auth.isLoggedIn !== true)
    {
      // return false;
      this.router.navigate(['']);
    }
    return true;
  }
}
