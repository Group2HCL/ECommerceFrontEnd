import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../Models/users1.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  localUser:Users= new Users;
  constructor(private http: HttpClient) { }
  
  signOut(): void {
    window.sessionStorage.removeItem('auth-token')
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    console.log("attempting to save to session storage" + token)
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    if(!window.sessionStorage.getItem(USER_KEY)){
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }else{
      this.localUser=user;
    }

  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (window.sessionStorage.getItem("user")){
      console.log("calling and returning local User")
      return JSON.parse(sessionStorage.getItem("user")!);
    }else if (user) {
      return JSON.parse(user);
      console.log(user);
    }
    return {};
  }
  convertToLocal(name: string, email: string): Observable<Users> {    
    console.log(email + " " + name)
   return this.http.post<Users>('http://localhost:8181/api/User/convert',{name,email})
}
  public parseStorage(){
    let storage = JSON.parse(localStorage.getItem("okta-token-storage")?? "undentified:unidentified")      
    this.saveToken(storage.accessToken.accessToken);

    this.saveUser(storage.idToken.claims);    
  }
 
}