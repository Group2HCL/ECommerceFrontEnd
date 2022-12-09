import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OKTA_CONFIG } from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    usernameLast: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  errorMessage = '';

  constructor(@Inject(OKTA_CONFIG) private oktaAuth:OktaAuth,private authService: AuthService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  async onSubmit(): Promise<void> {
    const { username,usernameLast, email, password } = this.form;
    this.authService.register(username,usernameLast, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}