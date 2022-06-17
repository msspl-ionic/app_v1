import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router, public common: CommonService) { }

  canActivate(): boolean {
    const isLoggedIn = this.common.isAuthenticated();
    if (isLoggedIn) {
        // authorised so return true
        // this._router.navigate(['/dashboard']);
        return true;
    }
    
    this._router.navigate(['/login']);
    return false;
  }
  
}
