import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Users } from 'src/app/Models/users1.model';
import { AuthService } from 'src/app/Services/auth.service';
import { PasswordServiceService } from 'src/app/Services/password.service';
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

  updatePasswordForm!: FormGroup;
  oldPassword!: FormControl;
  newPassword!: FormControl;
  cNewPassword!: FormControl;

  message = '';
  isMatching = false;


  constructor(private token: TokenStorageService, private auth: AuthService, private userService: UsersService, private passwordService: PasswordServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUser(this.token.getUser().id);

    this.oldPassword = new FormControl("", [Validators.required],);
    this.newPassword = new FormControl("", [Validators.required]);
    this.cNewPassword = new FormControl("", [Validators.required, this.passwordService.mustMatch(this.newPassword)]);

    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      cNewPassword: this.cNewPassword
    });


  }

  verifyAndUpdate(): void {
    this.verifyPassword();
    this.updatePassword()
  }

  verifyPassword(): void {
    console.log(this.oldPassword.value);
    console.log(this.userProfile.username);
    this.auth.verify(this.userProfile.username, this.oldPassword.value)
      .pipe(map(res => ({
        isMatching: res
      })))
      .subscribe({
        next: (res) => {
          console.log(res);
        }
      });
  }


  updatePassword(): void {
    this.message = '';
    if (this.updatePasswordForm.valid && this.isMatching == true) {
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
