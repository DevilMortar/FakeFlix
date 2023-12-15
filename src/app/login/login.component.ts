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

  selectUser(user: any) {
    this.userService.setConnectedUser(user);
    this.router.navigate(['/search']).then(r => console.log(" User logged in!"));
  }
}
