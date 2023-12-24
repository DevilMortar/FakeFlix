import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {Media} from "../media";

@Component({
  selector: 'app-slide-card-container',
  templateUrl: './slide-card-container.component.html',
  styleUrls: ['./slide-card-container.component.css']
})
export class SlideCardContainerComponent {
  @Input() mediaArray: Array<Media> = new Array<Media>(); // Array of media to be displayed
  @Input() loaded: boolean = false; // Boolean to check if the media has been loaded or are still loading
  container : any; // Container element of the carousel
  leftButton : any; // Left slide button
  rightButton : any; // Right slide button

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.container = this.el.nativeElement.querySelector('.slide-card-container');
    this.leftButton = this.el.nativeElement.querySelector('.btn-slide-left');
    this.rightButton = this.el.nativeElement.querySelector('.btn-slide-right');
    this.container.addEventListener('scroll', () => this.changeSlideButtonVisibility());
  }

  /***
    * When the mouse enters the carousel, call the function to change the visibility of the scroll buttons
   */
  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter() {
    this.changeSlideButtonVisibility();
  }

  /***
   * Slide the carousel to the left or right
   * @param toLeft - Boolean to check if the carousel should be scrolled to the left or right
   */
  slide(toLeft: boolean): void {
    const scrollAmount = toLeft ? -1250 : 1250;
    this.container.scrollLeft += scrollAmount;
  }

  /***
   * Change the visibility of the scroll buttons depending on the scroll position of the carousel and the screen size
   */
  changeSlideButtonVisibility(): void {
    // If the screen size is less than 1200px, the slide buttons are not visible
    if (window.innerWidth < 1200) {
      this.leftButton.style.visibility = 'hidden';
      this.rightButton.style.visibility = 'hidden';
      return;
    }
    // Otherwise, the slide buttons are visible if the carousel can be scrolled to the left or right
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
