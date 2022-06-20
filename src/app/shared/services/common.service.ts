import { BehaviorSubject } from 'rxjs';
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


	getToken() {
		return this.storage.get(environment.TOKEN_KEY);
		// let token = '';
		// this.storage.get(environment.TOKEN_KEY).then(token => {
		// 	console.log(token);
		// 	if (token) {
		// 		return token;
		// 	}

		// });
		// setTimeout(function () {
        //     return token;
        // }, 1000);
		
		// console.log(this.storage.get(environment.TOKEN_KEY));
		// return this.authenticationState.value;
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
