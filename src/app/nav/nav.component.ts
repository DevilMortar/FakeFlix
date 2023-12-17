import { Component } from '@angular/core';
import {DataService} from "../data.service";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  connectedUser: string = "Guest";
  userPicture: string = "https://via.placeholder.com/150x150.png?text=No+Image";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.userConnected$.subscribe(user => {
      console.log("New connection: " + user);
      this.connectedUser = user;
      this.userPicture = "../assets/images/" + this.connectedUser + ".jpg";
    });
    this.connectedUser = this.userService.getCurrentConnectedUser();
    if (this.connectedUser !== "Guest") {
      this.userPicture = "../assets/images/" + this.connectedUser + ".jpg";
    }
  }

  navigateTo(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    // Add logic to navigate to the selected route based on the value
    this.router.navigate([selectedValue]).then(r => console.log("Navigation done"));
  }
}
