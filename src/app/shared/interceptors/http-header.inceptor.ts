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
		headersConfig['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImE0MDBiZjc1NWRiYjE5NGMxNmNiYjlmYWMyMTM3MTg0ZDI0ODlkZTNhMzRkMjE0MzI1ZTk0NzhkNDBkMTFjZGU5ZDc3MmFlMTk4ZWQwMzJjOTU5YTQ5NTI1MTJkZTNhYTgzNjFkMjhlMzhmZjk4NmI1Mjg4N2JmMGJjNzk1OWIyMTI3YWE5MThiY2JkOGEyOTdiMGMzY2MwYTI5ZWIzNGNhZDFkNDAwMDc0ZDhlODYzN2EyOTBkNjM0MWI1NmNkMzEwYjQiLCJjdXN0b21lcl9waG9uZSI6Ijk4NzY1NDMyMTAiLCJpYXQiOjE2NTU4MDk4NDcsImV4cCI6MTY1NTgyNzg0N30.Ia35VHKOyq_0hwGok04KxyWpj24aTIrb4COwnC6LUok';
		

		const HTTPRequest = request.clone({ setHeaders: headersConfig });
		return next.handle(HTTPRequest);
		
	}
}