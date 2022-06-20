import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';
import { Storage } from '@ionic/storage';
import { environment } from '@env/environment';

@Injectable()
export class HttpAuthHeaderInterceptor implements HttpInterceptor {
	constructor(private _authService: CommonService, private storage: Storage) {}
	
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		/**
		 * *Adding Authorization token in header
		 *
		
		 */

		const headersConfig: any = {};

		/**
		 * If token found setting it in header
		 */
		//  this.storage.get(environment.TOKEN_KEY).then(token => {
			
		// 	if (token) {
		// 		headersConfig['Authorization'] = token;
		// 		const HTTPRequest = request.clone({ setHeaders: headersConfig });
		// 		return next.handle(HTTPRequest);
		// 	}

		// });
		
		const token: any = this._authService.getToken();
		console.log(token);
		if (token) {
			headersConfig['Authorization'] = token;
		}

		const HTTPRequest = request.clone({ setHeaders: headersConfig });
		return next.handle(HTTPRequest);
	}
}