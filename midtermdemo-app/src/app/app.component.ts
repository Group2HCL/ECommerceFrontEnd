import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH, OKTA_CONFIG } from '@okta/okta-angular';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { Users } from './Models/users1.model';
import { Subject } from 'rxjs';
import { CartService } from './Services/cart.service';
import { TokenStorageService } from './Services/token-storage.service';
import { UsersService } from './Services/users1.service';
import { Cart } from './Models/cart.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'midtermdemo-app';
  private roles: string[] = [];
  isLoggedIn = false;

  showAdminBoard = false;
  user?: Users;
  username!: Observable<string>;
  cartQty?: Subject<number> = this.cartService.totalQuantity;
  emptyCart: boolean = false;


  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private userService: UsersService, private cartService: CartService, private tokenStorage: TokenStorageService, private router: Router, private oktaAuthStateService: OktaAuthStateService) { }

  ngOnInit(): void {
    this.username = this.oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? ''));
    this.isLoggedIn = !!this.tokenStorage.getToken();
    this.user = this.tokenStorage.getUser();
    this.roles = this.user?.roles
    console.log('does this evaluate correctly? ' + this.user?.roles.includes('ROLE_ADMIN'));
    this.roles.forEach((k, v) => {
      if ((k) = 'ROLE_ADMIN') {
        this.showAdminBoard = true;
      }
    });

  }



  /* this.isLoggedIn= this.oktaAuth.authStateManager.updateAuthState().then
  this.tokenStorage.parseStorage()
  await this.oktaAuth.authStateManager.updateAuthState().then(authState => this.isLoggedIn = authState.isAuthenticated ?? false)
  .then(state => {if(state){
    this.roles= this.user!.roles;
    this.showAdminBoard = this.roles.includes('Admin');
    this.username = this.user!.username;
   }}).catch(e => console.error("no login detected"));
 (this.oktaAuth.authStateManager.getAuthState()?.isAuthenticated==this.isLoggedIn) ? console.log("Bar reports synced for " + this.user?.username):
   console.log("am i logged in for the bar?: " + this.isLoggedIn)
   if(this.isLoggedIn&&!this.tokenStorage.getUser()){
   let storage = JSON.parse(localStorage.getItem("okta-token-storage")?? "undentified:unidentified")      
   this.tokenStorage.saveToken(storage.accessToken.accessToken);
   this.tokenStorage.saveUser(this.user);    
   window.location.reload();}
  */
 
   async logout(): Promise < void> {
    this.isLoggedIn = false;
    await this.oktaAuth.signOut().then(x => this.tokenStorage.signOut()).catch(e => console.log("user not logged in"));
    window.sessionStorage.clear();
    window.localStorage.clear();
    window.location.reload()
    }
}

  
