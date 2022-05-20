import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { catchError, map, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
// import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private _http: HttpClient,
    // private _authService: AuthService,
  ) { }

  // token: any = this._authService.getUserTokenFromCookie();


  /**
   * @param Data : Getting as form value, or user putting in the form
   * @param Url : Specific url after the endpoint, Ex: http://localhost/8080/login. In this case /login
   * @param Method : in which type making the request (GET, POST, PUT, DELETE)
   * @Purpose: function for making all http requests to backend
  */
  ApiCall(
    data: any,
    route: any,
    method: "DELETE" | "GET" | "HEAD" | "POST" | "JSONP" | "PUT",
  ) {
    // let httpHeaderValue = new HttpHeaders();
    // httpHeaderValue = httpHeaderValue.set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.token}`).set('Access-Control-Allow-Origin', '*');

    // let httpHeaderValue = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`, 'Access-Control-Allow-Origin': '*' });

    let httpHeaderValue = new HttpHeaders({ 'Content-Type': 'application/json' });


    //creating final http request endpoint
    const endPoint = environment.apiUrl + route;

    // creating request variable of type Observable so that any component can subscribe it
    let request: Observable<any>;

    // setting methods of request type and passing params (endPoint, data, headeers and observe to access complete response)
    switch (method) {
      case "GET":
        request = this._http.get(endPoint, { observe: "response", headers: httpHeaderValue });
        break;
      case "POST":
        request = this._http.post(endPoint, data, { observe: "response" });
        break;
      case "PUT":
        request = this._http.put(endPoint, data, { observe: "response" });
        break;
      default:
        request = this._http.request(method, endPoint, { observe: "response" });
    }

    // returning api result with status, if found any error returns that error
    return request.pipe(
      timeout(environment.ajax_timeout),
      catchError((apiError: HttpErrorResponse) => {
        return throwError(apiError);
      }),
      map((apiResponse: HttpResponse<any>) => {
        let responseObject = apiResponse.body;
        responseObject.status = apiResponse.status;
        return responseObject;
      })
    );
  }

}