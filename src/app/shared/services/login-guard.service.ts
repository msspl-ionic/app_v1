import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private _router: Router, public common: CommonService) { }

  canActivate(): boolean {
    const isLoggedIn = this.common.isAuthenticated();
    console.log(isLoggedIn);
    if (!isLoggedIn) {
        // authorised so return true
        // this._router.navigate(['/login']);
        return true;
    }
    this._router.navigate(['tabs/dashboard']);
    return false;
  }
  
}