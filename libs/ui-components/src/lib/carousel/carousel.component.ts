import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList
} from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
  faDotCircle,
  faPause,
  faPlay
} from '@fortawesome/free-solid-svg-icons';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@Component({
  selector: 'rob-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterContentInit {
  @ContentChildren(CarouselItemComponent)
  carouselItems: QueryList<CarouselItemComponent>;

  /**
   * The amount of time it takes to move automatically to the next slide
   */
  @Input() interval = 1000;

  private setIntervalReturn: NodeJS.Timeout;

  public activeIndex = 0;

  public currentState: 'playing' | 'paused' = 'playing';

  public faChevronRight = faChevronRight;

  public faChevronLeft = faChevronLeft;

  public faDotCircle = faDotCircle;

  public faCircle = faCircle;

  public faPause = faPause;

  public faPlay = faPlay;

  public ngAfterContentInit(): void {
    if (this.carouselItems.length === 0 || !this.carouselItems) {
      throw new Error(
        'CarouselComponent needs to have CarouselItemComponents as children'
      );
    }
    this.carouselItems.first.isActive = true;
    this.startCarousel();
  }

  /**
   * Start the carousel so it automatically moves to the next slide
   * after the specified interval.
   */
  public startCarousel() {
    this.setIntervalReturn = (setInterval(() => {
      this.next();
    }, this.interval) as unknown) as NodeJS.Timeout;
  }

  /**
   * A method to clear the interval initialised in startCarousel
   */
  public pause() {
    clearInterval(this.setIntervalReturn);
  }

  public toggleState() {
    this.currentState = this.currentState === 'paused' ? 'playing' : 'paused';
    if (this.currentState === 'paused') {
      this.pause();
    } else {
      this.startCarousel();
    }
  }

  /**
   * A method to loop through the CarouselItems and set *only* the active one to active
   * @param {number} [index] An optional parameter to set a specific index
   */
  public setActiveCarouselItem(index?: number) {
    if (index !== undefined) {
      this.pause();
      this.activeIndex = index;
      this.startCarousel();
    }
    this.carouselItems.forEach((item, i) => {
      item.isActive = this.activeIndex === i;
    });
  }

  /**
   * Handle the user's click on the next button
   */
  public handleNextClick() {
    this.pause();
    this.next();
    this.startCarousel();
  }

  /**
   * Handle the user's click on the prev button
   */
  public handlePrevClick() {
    this.pause();
    this.prev();
    this.startCarousel();
  }

  /**
   * Move to the next CarouselItem
   */
  private next() {
    this.activeIndex =
      this.activeIndex + 1 >= this.carouselItems.length
        ? 0
        : this.activeIndex + 1;

    this.setActiveCarouselItem();
  }

  /**
   * Move to the previous CarouselItem
   */
  private prev() {
    this.activeIndex =
      this.activeIndex - 1 < 0
        ? this.carouselItems.length - 1
        : this.activeIndex - 1;

    this.setActiveCarouselItem();
  }
}
