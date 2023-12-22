import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Route, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userConnectedSubject = new Subject<string>();

  userConnected$ = this.userConnectedSubject.asObservable();

  constructor(private router : Router) {
    this.initConnectedUser();
  }

  logout() {
    localStorage.removeItem('connectedUser');
    this.router.navigate(['/login']);
  }

  initConnectedUser() {
    const username = localStorage.getItem('connectedUser') ?? 'Guest';
    if (username === 'Guest') {
      this.logout();
      return;
    }
    this.setConnectedUser(username);
  }

  public getCurrentConnectedUser() : string {
    return localStorage.getItem('connectedUser') ?? 'Guest';
  }

  public setConnectedUser(username: string) {
    localStorage.setItem('connectedUser', username);
    this.userConnectedSubject.next(username);
  }

  public isUserLikedMedia(id: string)  {
    const username = this.getCurrentConnectedUser();
    // Get the liked media for the user
    const likedMedia = this.getUserLikedMediasId(username);

    // Check if the media is in the list
    return likedMedia.includes(id);
  }

  public getLikedMediasOfConnectedUser() : Array<string> {
    // Get connected user from local storage
    const username = localStorage.getItem('connectedUser') ?? '';
    // Get the liked media for the user
    return this.getUserLikedMediasId(username);
  }

  public getUserLikedMediasId(username: string) : Array<string> {
    // Get the liked media for the user
    const likedMedia = localStorage.getItem(username);

    // If no liked media are found, return an empty list
    if (likedMedia === null) {
      return [];
    }

    // Parse the JSON string into an array
    return JSON.parse(likedMedia);
  }

  public changeMediaLikeStatus(id: string, status: boolean) {
    if (status) {
      this.likeMedia(id);
    } else {
      this.unlikeMedia(id);
    }
  }

  public likeMedia(id: string ){
    const username = this.getCurrentConnectedUser();
    // Get the liked media for the user
    const likedMedia = this.getUserLikedMediasId(username);
    if (likedMedia.includes(id)) {
      return;
    }

    // Add the new media to the list
    likedMedia.push(id);

    // Store the list in the local storage
    localStorage.setItem(username, JSON.stringify(likedMedia));
  }

  public unlikeMedia(id: string) {
    const username = this.getCurrentConnectedUser();
    // Get the liked media for the user
    const likedMedia = this.getUserLikedMediasId(username);
    if (!likedMedia.includes(id)) {
      return;
    }

    // Remove the media from the list
    const index = likedMedia.indexOf(id);
    likedMedia.splice(index, 1);

    // Store the list in the local storage
    localStorage.setItem(username, JSON.stringify(likedMedia));
  }
}
