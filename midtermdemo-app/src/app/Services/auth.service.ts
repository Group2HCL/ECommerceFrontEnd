import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8181/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(): Observable<any> {
    return this.http.get(AUTH_API + 'signin', httpOptions);
  }

  register(username: string,usernameLast: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      usernameLast,
      email,
      password,      
    }, httpOptions);
  }

  verify(username: any, password: any ): Observable<any> {
    return this.http.post(AUTH_API + 'verifypw', {
      username, password
    },  

      )
  }
}