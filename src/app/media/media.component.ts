import {Component, Input} from '@angular/core';
import {Media} from "../media";
import {Router} from "@angular/router";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {
  @Input() media: Media | undefined; // The media object to display

constructor(private router: Router) { }

  /***
    * This method is called when the user clicks on the card.
    * It navigates to the media details page.
    */
  onCardClick() {
    if (this.media?.imdbID) {
      this.router.navigate(['/media', this.media.imdbID]).then();
    }
  }
}
