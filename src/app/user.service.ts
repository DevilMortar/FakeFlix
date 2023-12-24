import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // The subject to notify when the user connected change
  private userConnectedSubject = new Subject<string>();

  // The observable to subscribe to when the user connected change
  userConnected$ = this.userConnectedSubject.asObservable();

  constructor(private router : Router) {
    this.initConnectedUser();
  }

  /***
    * Logout the user and redirect to the login page
   */
  logout() {
    localStorage.removeItem('connectedUser');
    this.router.navigate(['/login']).then();
  }

  /***
    * Init the connected user. If no user is found in the local storage, the user is set to Guest and redirected to the login page
   */
  initConnectedUser() {
    const username = localStorage.getItem('connectedUser') ?? 'Guest';
    if (username === 'Guest') {
      this.logout();
      return;
    }
    this.setConnectedUser(username);
  }

  /***
    * Return the current connected user
   */
  public getCurrentConnectedUser() : string {
    return localStorage.getItem('connectedUser') ?? 'Guest';
  }

  /***
   * Set the current connected user
   * @param username the username of the user
   */
  public setConnectedUser(username: string) {
    localStorage.setItem('connectedUser', username);
    this.userConnectedSubject.next(username);
  }

  /***
   * Check if a user liked a media by its id
   * @param id the id of the media
   * @return true if the user liked the media, false otherwise
   */
  public isUserLikedMedia(id: string)  {
    const username = this.getCurrentConnectedUser();
    // Get the liked media for the user
    const likedMedia = this.getUserLikedMediasId(username);

    // Check if the media is in the list
    return likedMedia.includes(id);
  }

  /***
   * Get the liked medias list of a user
   * @param username the username of the user
   * @return the list of the liked medias id
   */
  public getUserLikedMediasId(username: string) : Array<string> {
    return JSON.parse(localStorage.getItem(username) || '[]');
  }

  /***
   * Get the liked medias list of the current connected user
   * This method call getUserLikedMediasId with the current connected user
   * @return the list of the liked medias id
   */
  public getLikedMediasOfConnectedUser() : Array<string> {
    return this.getUserLikedMediasId(this.getCurrentConnectedUser());
  }

  /***
   * Change the like status of a media by its id for the current connected user
   * @param id the id of the media
   * @param status the new like status (true if the user liked the media, false otherwise)
   */
  public changeMediaLikeStatus(id: string, status: boolean) {
    if (status) {
      this.likeMedia(id);
    } else {
      this.unlikeMedia(id);
    }
  }

  /***
   * Like a media by its id for the current connected user
   * @param id the id of the media
   */
  public likeMedia(id: string ){
    const username = this.getCurrentConnectedUser();
    const likedMedia = this.getUserLikedMediasId(username);
    // Check if the media is already in the list
    if (likedMedia.includes(id)) {
      return;
    }
    // Add the media to the list
    likedMedia.push(id);
    localStorage.setItem(username, JSON.stringify(likedMedia));
  }

  /***
   * Unlike a media by its id for the current connected user
   * @param id the id of the media
   */
  public unlikeMedia(id: string) {
    const username = this.getCurrentConnectedUser();
    const likedMedia = this.getUserLikedMediasId(username);
    // Check if the media is in the list
    if (!likedMedia.includes(id)) {
      return;
    }

    // Remove the media from the list
    const index = likedMedia.indexOf(id);
    likedMedia.splice(index, 1);
    localStorage.setItem(username, JSON.stringify(likedMedia));
  }
}
