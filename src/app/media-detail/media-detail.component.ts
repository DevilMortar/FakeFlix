import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";
import {MediaDetail} from "../media-detail";
import {Media} from "../media";
import {UserService} from "../user.service";

@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.component.html',
  styleUrls: ['./media-detail.component.css']
})
export class MediaDetailComponent {
  media: MediaDetail | null = null;
  similarMediaArray: Array<Media> = new Array<Media>();
  loaded: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private userService: UserService)
  { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.loaded = false;
        this.similarMediaArray = new Array<Media>();
        this.media = null;
        this.dataService.getMediaById(params.get('id') ?? '').subscribe(
          (val : any) => {
            this.media = val;
            if (this.media !== null)
              this.dataService.searchSimilarMedia(this.media).subscribe(
                (val:Array<Media>) => this.similarMediaArray = val
              );
            this.loaded = true;
          }
        )
      }
    )
  }

  likeMedia() {
    console.log('Liked media with id ' + this.media?.imdbID);
    // Store the liked media in the local storage, for the user "mathias"
    if (this.media !== null) {
      this.media.isLiked =! this.media.isLiked;
      this.userService.changeMediaLikeStatus(this.media.imdbID, this.media.isLiked);
    }
  }
}
