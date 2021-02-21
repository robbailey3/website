import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IntersectionObserverDirective } from '../intersection-observer/intersection-observer.directive';

@Component({
  selector: 'rob-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss']
})
export class LazyImageComponent implements OnInit {
  @ViewChild(IntersectionObserverDirective)
  intersectionObserver: IntersectionObserverDirective;

  @Input() src: string;

  @Input() thumbnailSrc: string;

  @Input() loadOn: 'scroll' | 'imageload';

  @Input() alt: string;

  public imageSource: string;

  private isInViewport: Subject<boolean> = new Subject();

  public ngOnInit(): void {
    this.imageSource = this.thumbnailSrc;
    this.loadFullsizeImage();
  }

  private loadFullsizeImage() {
    const img = new Image();
    img.src = this.src;
    img.onload = () => this.handleImageLoad();
  }

  private handleImageLoad() {
    if (this.loadOn === 'scroll') {
      this.isInViewport.pipe(filter((val) => !!val)).subscribe({
        next: () => {
          this.switchImageSource();
        }
      });
    } else {
      this.switchImageSource();
    }
  }

  private switchImageSource() {
    console.log('SWITCHING SOURCE', this.imageSource);
    this.imageSource = this.src;
    console.log('SWITCHED SOURCE', this.imageSource);
  }

  public handleViewportEntry() {
    console.log('IS IN VIEWPORT');
    setTimeout(() => {
      this.isInViewport.next(true);
    }, 2000);
  }
}
