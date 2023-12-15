import {Component, Input} from '@angular/core';
import {Media} from "../media";
import {Router} from "@angular/router";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent {
  @Input() media: Media | undefined;

constructor(private router: Router) { }

  onCardClick() {
    if (this.media?.imdbID) {
      // Utilisez le service Router pour naviguer vers la page /media/:id
      this.router.navigate(['/media', this.media.imdbID]);
    }
  }
}
