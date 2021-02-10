import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpectatorHost } from '@ngneat/spectator';
import { ButtonsModule } from '../buttons/buttons.module';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

import { CarouselComponent } from './carousel.component';

@Component({
  template: `<rob-carousel>
    <rob-carousel-item><h1>Item 1</h1></rob-carousel-item>
    <rob-carousel-item><h1>Item 2</h1></rob-carousel-item>
    <rob-carousel-item><h1>Item 3</h1></rob-carousel-item>
    <rob-carousel-item><h1>Item 4</h1></rob-carousel-item>
  </rob-carousel>`,
  selector: 'rob-carousel-test'
})
class CarouselTestComponent {}

describe('CarouselComponent', () => {
  // TODO: Refactor this to use Spectator
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let spectator: SpectatorHost<CarouselComponent, CarouselTestComponent>;

  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CarouselTestComponent,
        CarouselComponent,
        CarouselItemComponent
      ],
      imports: [ButtonsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselTestComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[METHOD]: startCarousel', () => {
    it('should be defined', () => {
      expect(component.startCarousel).toBeDefined();
    });

    it('should call setInterval', () => {
      const spy = jest.spyOn(window, 'setInterval');
      component.startCarousel();
      expect(spy).toHaveBeenCalled();
    });

    it('should use this.interval as the setInterval arg', () => {
      const spy = jest.spyOn(window, 'setInterval');
      component.startCarousel();
      expect(spy).toHaveBeenCalledWith(
        expect.any(Function),
        component.interval
      );
    });
  });
  describe('button functionality', () => {
    it('should move to the next item when the next button is clicked', () => {
      const nextButton = fixture.debugElement.nativeElement.querySelector(
        '.carousel-next button'
      );
      const currentIndex = component.activeIndex;
      nextButton.dispatchEvent(new Event('click'));
      expect(component.activeIndex).toBe(
        currentIndex + 1 >= component.carouselItems.length
          ? 0
          : currentIndex + 1
      );
    });
    it('should move to the previous item when the previous button is clicked', () => {
      const prevButton = fixture.debugElement.nativeElement.querySelector(
        '.carousel-prev button'
      );
      const currentIndex = component.activeIndex;
      prevButton.dispatchEvent(new Event('click'));
      expect(component.activeIndex).toBe(
        currentIndex - 1 < 0
          ? component.carouselItems.length - 1
          : currentIndex - 1
      );
    });
  });
});
