import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OKTA_AUTH, OKTA_CONFIG } from "@okta/okta-angular";
import { OktaAuth } from "@okta/okta-auth-js";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { TokenStorageService } from "../Services/token-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router : Router, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth, private tokenStorage: TokenStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }

        const oktaToken = this._oktaAuth.getAccessToken();
        const backendToken = oktaToken;

        if(backendToken != null) {
            req = this.addBackEndToken(req, backendToken);
        } else if (oktaToken != null) {
            req = this.addOktaToken(req, oktaToken);
        }

        console.log("this is the interceptor")
        return next.handle(req).pipe(
            catchError(
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    if(err.status === 401) {
                        this.router.navigate(['/auth/login']);
                    } else if (err.status === 403) {
                        this.router.navigate(['/forbidden']);
                    } else if (err.status === 200) {
                        console.log("OK STATUS");
                        return throwError("OK");
                    } 

                    return throwError("Something is wrong");
                }
            )
        );
    }

    private addBackEndToken(request:HttpRequest<any>, backendToken:string) {
        return request.clone(
            {
                setHeaders: {
                    Authorization : `Bearer ${backendToken}`
                }
            }
        );
    } 
    private addOktaToken(request: HttpRequest<unknown>, oktaToken: string): HttpRequest<unknown> {
        let req = request;
        const allowedOrigins = ['http://localhost'];
        if (!!allowedOrigins.find(origin => request.url.includes(origin))) {
          req = request.clone({ setHeaders: { 'Authorization': `Bearer ${oktaToken}` } });
        }
    
        return req;
      }

}

/*import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../Services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}
*/
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];