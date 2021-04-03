import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { IntersectionObserverDirective } from '../intersection-observer/intersection-observer.directive';

import { LazyImageComponent } from './lazy-image.component';

describe('LazyImageComponent', () => {
  let component: LazyImageComponent;
  let fixture: ComponentFixture<LazyImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LazyImageComponent, IntersectionObserverDirective],
      imports: [NgtUniversalModule],
      schemas: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
