import {Component, Input, OnInit} from '@angular/core';
import {Media} from "../media";
import {DataService} from "../data.service";

@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.css']
})
export class HomeSectionComponent implements OnInit {
  @Input() title:string = ''; // Title of the section
  @Input() search:string = ''; // Search term to use in the API call
  mediaArray: Array<Media> = new Array<Media>(); // Array of Media objects
  dataFetched: boolean = false; // Flag to indicate if the data has been fetched from the API

  constructor(private dataService: DataService) {}

  ngOnInit() {
      // Get the {{search}} results from the API
      this.dataService.searchMediaByName(this.search).subscribe(
        (val:Array<Media>) => {
          this.mediaArray = val;
          this.dataFetched = true;
        }
      );
  }
}
