import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() name = 'John Doe';
  @Output() eventOut = new EventEmitter<string>();

  onClick() {
    this.eventOut.emit(this.name.toLowerCase());
  }
}
