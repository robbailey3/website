import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCarouselComponent } from './homepage-carousel.component';

describe('HomepageCarouselComponent', () => {
  let component: HomepageCarouselComponent;
  let fixture: ComponentFixture<HomepageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageCarouselComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
