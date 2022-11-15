import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users1.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/Models/users1.model';
import { map } from 'rxjs/internal/operators/map';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentUser: Users = {
    username: '',
    email: '',
    password: '', 
    roles: []
  };
  
  message = '';
  userRoles: any;
  roleName = '';
  isAdmin = false;


  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }

  adminToggle(): void {
    this.userService.adminToggle(this.currentUser.id)
      .pipe(map(resp => ({
        isAdmin:resp
      })))
      .subscribe(resp => console.log())
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          this.userRoles = (this.currentUser.roles)
          console.log(this.userRoles)
          for(let i =0; i <this.userRoles.length; i++) {
             if(this.userRoles[i].name === 'ROLE_ADMIN') {
             this.isAdmin =true; 
             }  
          }
          console.log(this.isAdmin)
        },
        error: (e) => console.error(e)
      });
  }



  updateUser(): void {
    this.message = '';

    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This user was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/users']);
        },
        error: (e) => console.error(e)
      });
  }

}