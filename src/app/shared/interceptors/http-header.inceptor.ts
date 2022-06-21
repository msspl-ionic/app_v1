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
		headersConfig['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6IjQzZWU4Yzc5ZTgwNDc3OTU3MzIyZmIyNTVhN2IzYmVkMjAzYjQyMDQ3M2ZjMGVkZGNhYjZkM2I5ZGNkZDkwMzM5MWY0Y2Q0NWQwYmJiMjI3ZmM2N2Q5N2Y0MjEyNDlkODgxZjg1NTgwNGIxYTRhYTZhMGE5ZjZiOGIxZDVlYjliYmNiYzRkNGFmMWRlMTc1ZDRkNmNjYjRiNDk1NTAwOGYyYmM0OTQyZTdkNjM5ZjRkMThjZGQ1YWY0OTIzMDExOWY2OGMiLCJjdXN0b21lcl9waG9uZSI6Ijc4OTQ1NjEyMzAiLCJpYXQiOjE2NTU4MTQ1NjcsImV4cCI6MTY1NTgzMjU2N30.WbnKLiVS16y6fJlYr4nKgO4D5MBCL8S2iaUbgD7cKyU';
		

		const HTTPRequest = request.clone({ setHeaders: headersConfig });
		return next.handle(HTTPRequest);
		
	}
}