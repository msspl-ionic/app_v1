import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private _router: Router, public auth: AuthService) { }

  canActivate(): boolean {
    const isLoggedIn = this.auth.isAuthenticated();
    if (!isLoggedIn) {
        // authorised so return true
        return true;
    }
    
    this._router.navigate(['/dashboard']);
    return false;
  }
  
}