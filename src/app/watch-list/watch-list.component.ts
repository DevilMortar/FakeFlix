import { Component } from '@angular/core';
import {Media} from "../media";
import {UserService} from "../user.service";
import {DataService} from "../data.service";

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent {
  mediaArray : Array<Media> = new Array<Media>();
  constructor(private userService: UserService, private dataService: DataService) {}
  ngOnInit() {
    const likedMedias = this.userService.getLikedMediasOfConnectedUser();
    this.dataService.getMediaByIds(likedMedias).subscribe(
      (val:Array<Media>) => {
        this.mediaArray = val;
        this.mediaArray.sort((a, b) => a.Title.localeCompare(b.Title));
      }
    );
  }
}
