import {Component, Input} from '@angular/core';
import {Media} from "../media";

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent {
  @Input() mediaArray: Array<Media> = new Array<Media>();
  @Input() loading: boolean = false;
}
