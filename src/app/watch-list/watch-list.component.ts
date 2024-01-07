import { Component } from '@angular/core';
import {Media} from "../media";
import {UserService} from "../user.service";
import {DataService} from "../data.service";

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent {
  mediaArray : Array<Media> = new Array<Media>();
  dataFetched : boolean = false;
  constructor(private userService: UserService, private dataService: DataService) {}
  ngOnInit() {
    // Get the list of ids of liked medias of the connected user
    const likedMedias = this.userService.getLikedMediasOfConnectedUser();
    if (likedMedias.length === 0) {
      this.dataFetched = true;
      return;
    }
    // Get medias list from the ids list
    this.dataService.getMediaByIds(likedMedias).subscribe(
      (val:Array<Media>) => {
        this.mediaArray = val;
        this.mediaArray.sort((a, b) => a.Title.localeCompare(b.Title));
        this.dataFetched = true;
      }
    );
  }
}
