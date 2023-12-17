import { Component } from '@angular/core';
import {Media} from "../media";
import {DataService} from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mediaArrayA : Array<Media> = new Array<Media>();
  mediaArrayB : Array<Media> = new Array<Media>();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.searchMediaByName("Star Wars").subscribe(
      (val:Array<Media>) => {
        this.mediaArrayA = val;
      }
    );
    this.dataService.searchMediaByName("Harry Potter").subscribe(
      (val:Array<Media>) => {
        this.mediaArrayB = val;
      }
    );
  }
}
