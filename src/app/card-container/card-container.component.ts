import {Component, Input} from '@angular/core';
import {Media} from "../media";

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent {
  @Input() mediaArray: Array<Media> = new Array<Media>(); // Array of Media to display
  @Input() loaded: boolean = false; // If the data has been loaded from the API or if it is still loading
}
