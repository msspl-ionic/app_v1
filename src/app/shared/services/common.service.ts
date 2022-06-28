import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { Storage } from '@ionic/storage-angular';

@Injectable({
	providedIn: 'root'
})

export class CommonService {
	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private storage: Storage
	) { }

	public _onUpdatePhoneSubject: BehaviorSubject<any> =
		new BehaviorSubject<any>(null);

	public onPhoneUpdateSource$ = this._onUpdatePhoneSubject.asObservable();

	public authenticationState: BehaviorSubject<boolean> =
	new BehaviorSubject<boolean>(false);

	// Update Location
	public _onUpdateLocation: BehaviorSubject<any> =
		new BehaviorSubject<any>(null);

	public onUpdateLocation$ = this._onUpdateLocation.asObservable();

	public _onProfileData: BehaviorSubject<any> =
		new BehaviorSubject<any>(null);
	public _onProfileDataAll$ =	this._onProfileData.asObservable();

	public _onUpdateCatTitle: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	public _onUpdateCatTitle$ =	this._onUpdateCatTitle.asObservable();

	

	public setProfileData(data: []): void {
		this._onProfileData.next(data);
	}


	getToken() {
		// return new Observable((observer) => {
		// 	this.storage.get(environment.TOKEN_KEY).then(token => {
		// 		// console.log(token);
		// 		if (token) {
		// 			return observer.next(token);
		// 		}
		// 	})
		// })
		return this.storage.get(environment.TOKEN_KEY).then(token => {
			if(token) {
				return token;
			}
		});
	}

	isAuthenticated() {
		const isLoggedIn = this.authenticationState.value;

		console.log(isLoggedIn);
		// return;
		if (isLoggedIn) {
			// authorised so return true
			return true;
		}else{
			return false;
		}
	}

	logout() {
		this.storage.remove(environment.TOKEN_KEY).then(() => {
		  this.authenticationState.next(false);
		  this._router.navigate(['/login']);
		});
	}
}
