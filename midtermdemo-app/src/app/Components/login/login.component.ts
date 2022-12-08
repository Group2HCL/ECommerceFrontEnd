import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth, TokenManager } from '@okta/okta-auth-js';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  userN: string = '';

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private authService: AuthService, private tokenStorage: TokenStorageService, private router:Router) { }

  ngOnInit() {
   
   this.oktaAuth.isAuthenticated().then(isAuthenticated => this.isLoggedIn = isAuthenticated)
    console.log('testing for logged in: ' + this.tokenStorage.getUser().name + " " + this.isLoggedIn);
    if (this.isLoggedIn) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    try{
    this.oktaAuth.setOriginalUri(window.location.origin)
    this.oktaAuth.token.getWithRedirect({
      redirectUri:window.location.origin+ '/login/callback',
      responseType: ['token', 'id_token']     
    }).then(data => {
      let storage = JSON.parse(localStorage.getItem("okta-token-storage")?? "undentified:unidentified")      
      this.tokenStorage.saveToken(storage.accessToken);
      this.tokenStorage.saveUser(storage.idToken.claims);
      this.isLoginFailed=false;
      this.isLoggedIn=true;
      this.roles=this.tokenStorage.getUser().groups;
      this.userN = this.tokenStorage.getUser().name;
      this.router.navigate(['login'])
      ;

    }).catch(err => console.error(err))}catch{console.error(this.errorMessage)};
   
  console.log('testing for logged in: ' + this.tokenStorage.getUser().name)

/*this.authService.login().subscribe(
  data => {
    this.tokenStorage.saveToken(data.token);
    this.tokenStorage.saveUser(data);

    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.roles = this.tokenStorage.getUser().roles;
    this.userN = this.tokenStorage.getUser().username;
    this.reloadPage();
  },
  err => {
    this.errorMessage = err.error.message;
    this.isLoginFailed = true;
  }
);*/
  }

reloadPage(): void {
  window.location.reload();
}
}