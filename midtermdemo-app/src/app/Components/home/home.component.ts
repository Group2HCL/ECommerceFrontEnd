import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { UsersService } from 'src/app/Services/users1.service';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { Users } from 'src/app/Models/users1.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  isLoggedIn = false;

  constructor(@Inject(OKTA_AUTH)private oktaAuth: OktaAuth, private userService: UsersService, private pagerService: UserService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    
    if(localStorage.getItem("okta-token-storage")&&!window.sessionStorage.getItem("user")){
      try {
        this.tokenStorage.parseStorage()
        this.tokenStorage.convertToLocal(this.tokenStorage.getUser().name,this.tokenStorage.getUser().preferred_username).subscribe((x: any)=>{sessionStorage.setItem("user",JSON.stringify(x));})
        console.log(this.tokenStorage.localUser.email)
        console.log(this.tokenStorage.localUser.username)

        console.log("Login Handle Success")
      } catch {
        console.log("handle failed")
      }     
    }         
    this.isLoggedIn = !!this.tokenStorage.getToken();
    console.log("Are we logged into home component? " + this.isLoggedIn)
   /* if(this.isLoggedIn&&!this.tokenStorage.getUser()){
    this.tokenStorage.saveToken(storage.accessToken.accessToken);
    this.tokenStorage.saveUser(this.tokenStorage.convertToLocal());
    window.location.reload()    
    }*/
    
    this.pagerService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}