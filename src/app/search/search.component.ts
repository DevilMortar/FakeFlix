import { Component } from '@angular/core';
import {DataService} from "../data.service";
import {Media} from "../media";
import {FormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {NavComponent} from "../header/nav.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  mediaArray : Array<Media> = new Array<Media>();
  searchForm: UntypedFormGroup;
  searchCtrl: FormControl<string>;
  constructor(private dataService: DataService) {
    this.searchCtrl = new FormControl('', { validators: [Validators.required], nonNullable: true });
    this.searchForm = new UntypedFormGroup({
      search: this.searchCtrl
    });
  }
  ngOnInit() {
    this.searchCtrl.valueChanges.subscribe(
      val => this.dataService.searchMediaByName(val).subscribe(
        (val:Array<Media>) => {
          console.log(val);
          if (val.length > 0) {
            this.mediaArray = val;
          }
          else this.mediaArray = [];
        }
      )
    );
  }

  onSubmit() {
    this.dataService.searchMediaByName(this.searchCtrl.value).subscribe((data: any) => {
      this.mediaArray = data;
    });
  }
}
