import { Component } from '@angular/core';
import {DataService} from "../data.service";
import {Media} from "../media";
import {FormControl, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  mediaArray : Array<Media> = new Array<Media>(); // Array of media objects
  dataFetched: boolean = false; // Flag to indicate if data has been fetched or is being fetched
  searchForm: UntypedFormGroup; // Form group for search form
  searchCtrl: FormControl<string>; // Form control for search input
  constructor(private dataService: DataService) {
    this.searchCtrl = new FormControl('', { validators: [Validators.required], nonNullable: true });
    this.searchForm = new UntypedFormGroup({
      search: this.searchCtrl
    });
  }
  ngOnInit() {
    // Subscribe to value changes of search input to fetch data from API
    this.searchCtrl.valueChanges.subscribe(
      val => {
        this.mediaArray = [];
        this.dataFetched = false;
        this.dataService.searchMediaByName(val).subscribe(
          (val:Array<Media>) => {
            console.log(val);
            if (val.length > 0) {
              this.dataFetched = true;
              this.mediaArray = val;
            }
            else this.mediaArray = [];
            this.dataFetched = true;
          }
        )
      }
    );
  }

  /***
    * Function to submit the search form and fetch data from API
   */
  onSubmit() {
    this.dataService.searchMediaByName(this.searchCtrl.value).subscribe((data: any) => {
      this.mediaArray = data;
    });
  }
}
