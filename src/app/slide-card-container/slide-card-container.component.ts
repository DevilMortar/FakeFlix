import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {Media} from "../media";

@Component({
  selector: 'app-slide-card-container',
  templateUrl: './slide-card-container.component.html',
  styleUrls: ['./slide-card-container.component.css']
})
export class SlideCardContainerComponent {
  @Input() mediaArray: Array<Media> = new Array<Media>();
  @Input() loading: boolean = false;
  container : any;
  leftButton : any;
  rightButton : any;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.container = this.el.nativeElement.querySelector('.slide-card-container');
    this.leftButton = this.el.nativeElement.querySelector('.btn-slide-left');
    this.rightButton = this.el.nativeElement.querySelector('.btn-slide-right');
    this.container.addEventListener('scroll', () => this.changeScrollButtonVisibility());
  }

  /*On Hover listener for the left and right buttons*/
  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(target: any) {
    this.changeScrollButtonVisibility();
  }

  scroll(isLeft: boolean): void {
    const scrollAmount = isLeft ? -1250 : 1250;
    this.container.scrollLeft += scrollAmount;
  }

  changeScrollButtonVisibility(): void {
    /* If the screen size is less than 1200px, the scroll buttons are not visible */
    if (window.innerWidth < 1200) {
      this.leftButton.style.visibility = 'hidden';
      this.rightButton.style.visibility = 'hidden';
      return;
    }
    if (this.container.scrollLeft === 0) {
      this.leftButton.style.visibility = 'hidden';
    } else {
      this.leftButton.style.visibility = 'visible';
    }
    if (this.container.scrollLeft === this.container.scrollWidth - this.container.clientWidth) {
      this.rightButton.style.visibility = 'hidden';
    } else {
      this.rightButton.style.visibility = 'visible';
    }
  }
}
