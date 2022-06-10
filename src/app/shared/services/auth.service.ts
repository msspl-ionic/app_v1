import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  url = environment.apiUrl;
  user = null;
  authenticationState = new BehaviorSubject(false);
 
  constructor(private _router: Router, private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController) {
      this.plt.ready().then(() => {
        this.checkToken();
      });


  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }

  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }
 
  login(credentials) {
    return this.http.post(`${this.url}user/login`, credentials)
      .pipe(
        tap((res: any) => {
          // console.log(res.response.dataset.token); return;
          this.storage.set(TOKEN_KEY, res.response.dataset.token);
          this.user = this.helper.decodeToken(res.response.dataset.token);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      );
  }
 
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      this._router.navigate(['/login']);
    });
  }
 
  getSpecialData() {
    return this.http.get(`${this.url}/api/special`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    )
  }
 
  isAuthenticated() {
    // let isLoggedIn = false;
    // this.authenticationState.subscribe(res=>{
    //   isLoggedIn = res;
    //   console.log(res);
    //   return isLoggedIn;
    // });
    // return isLoggedIn;
    
    return this.authenticationState.value;
  }
  
  isLoggedIn() {
    return this.authenticationState.asObservable();
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
  
}
