import {Component, Input, OnInit} from '@angular/core';
import {Media} from "../media";
import {DataService} from "../data.service";

@Component({
  selector: 'app-home-demo',
  templateUrl: './home-demo.component.html',
  styleUrls: ['./home-demo.component.css']
})
export class HomeDemoComponent implements OnInit {
  @Input() title:string = 'Home Demo';
  @Input() search:string = '';
  mediaArray: Array<Media> = new Array<Media>();
  dataFetched: boolean = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
      // Get the {{search}} saga
      this.dataService.searchMediaByName(this.search).subscribe(
        (val:Array<Media>) => {
          this.mediaArray = val;
          this.dataFetched = true;
        }
      );
  }
}
