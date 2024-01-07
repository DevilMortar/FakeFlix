import { Component } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  connectedUser: string = "Guest"; // User connected
  userPicture: string = "https://via.placeholder.com/150x150.png?text=No+Image"; // User picture

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to the userConnected$ observable to know when the user connected changes
    this.userService.userConnected$.subscribe(user => {
      console.log("New connection: " + user);
      this.connectedUser = user;
      this.userPicture = "../assets/images/" + this.connectedUser + ".jpg";
    });
    // Get the initial current connected user
    this.connectedUser = this.userService.getCurrentConnectedUser();
    if (this.connectedUser !== "Guest") {
      this.userPicture = "../assets/images/" + this.connectedUser + ".jpg";
    }
  }
}
