import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse
} from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { CommonService } from '../services/common.service';
import { Storage } from '@ionic/storage';
import { environment } from '@env/environment';
import { filter, map, switchMap, switchMapTo, take } from 'rxjs/operators';


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
		
		
		//console.log(this._authService.getToken());
		

		let HTTPRequest:any = request.clone({ setHeaders: headersConfig });

		// return this._authService.getToken().pipe(
			
		// 	switchMap((token)=>{
		// 	 	return next.handle(HTTPRequest.clone({
		// 			setHeaders: { Authorization: token }
		// 		}))
		// 	})
		// )

		return from(this._authService.getToken()).pipe(
			
			switchMap((token)=>{
				// console.log(token);
				if(token != undefined && token !='' && token != null){
					return next.handle(HTTPRequest.clone({
						setHeaders: { Authorization: token }
					}))
				}else{
					return next.handle(HTTPRequest);
				}
			})
		)
		
	}
}