import { Component } from '@angular/core';

import {Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.logout();
  }

  /***
    * Set the user clicked as the connected user and navigate to the home page
    * @param user
   */
  selectUser(user: any) {
    this.userService.setConnectedUser(user);
    this.router.navigate(['/home']).then(r => console.log("User logged in!"));
  }
}
