import { Component, Input, OnInit } from '@angular/core';
import { Users } from 'src/app/Models/users1.model';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { UserService } from 'src/app/Services/user.service';
import { UsersService } from 'src/app/Services/users1.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() userProfile: Users = {
    username: '',
    email: '',
    password: '',
  };

  message = '';


  constructor(private token: TokenStorageService, private userService: UsersService) { }

  ngOnInit(): void {
    this.getUser(this.token.getUser().id);
  }


  getUser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.userProfile = data;
        },
        error: (e) => console.error(e)
      });
  }

  updateUser(): void {
    this.message = '';

    this.userService.update(this.userProfile.id, this.userProfile)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Account updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
}