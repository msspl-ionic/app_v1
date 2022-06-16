import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public common: CommonService) { }

  canActivate(): boolean {
    return this.common.isAuthenticated();
  }
  
}
