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
		headersConfig['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6IjBkNjM1OTUzYWE5MWNhMDczN2U0OWI4ODYzMGUzOWY3MmFjYzM2NzE2NTRjOTIxNTRkNGFmNmYxODUwZDQzNmYyYjk1OGE4N2I2NGQ1ZTc1YjVmNDVjNTI5MGNjZjhiNDNiZjgwZjdlNTAxN2EzM2ZiZDNmNDQ5OWE1OTVkZDQ4MGQxNmFhYWRiNWM0ODQ3ZDU5NWU3N2U4OTdjNTQ5ZDU1MTBiM2QzOTQ3M2U3MTBjMjY1NjMyYzcwMWFjNTQwMDA4ZDgiLCJjdXN0b21lcl9waG9uZSI6Ijc4OTQ1NjEyMzAiLCJpYXQiOjE2NTU3OTE0NDgsImV4cCI6MTY1NTgwOTQ0OH0.2-SvUyfZ-bKLRlpNT5RQeVLERul4q9Ymc2BrcRrd5jw';
		

		const HTTPRequest = request.clone({ setHeaders: headersConfig });
		return next.handle(HTTPRequest);
		
	}
}