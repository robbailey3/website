import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IntersectionObserverDirective } from '../intersection-observer/intersection-observer.directive';

interface Window {
  Image: typeof Image;
}

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

  public isLoaded = false;

  private isInViewport: Subject<boolean> = new Subject();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  public ngOnInit(): void {
    this.imageSource = this.thumbnailSrc;
    this.loadFullsizeImage();
  }

  private loadFullsizeImage() {
    const img = this.document.createElement('img');
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
    this.imageSource = this.src;
    this.isLoaded = true;
  }

  public handleViewportEntry() {
    setTimeout(() => {
      this.isInViewport.next(true);
    }, 2000);
  }
}
