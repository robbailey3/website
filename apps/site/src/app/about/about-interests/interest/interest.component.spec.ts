import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { interests } from '../interests';

import { InterestComponent } from './interest.component';

describe('InterestComponent', () => {
  let component: InterestComponent;
  let fixture: ComponentFixture<InterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterestComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestComponent);
    component = fixture.componentInstance;
    // eslint-disable-next-line prefer-destructuring
    component.interest = interests[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
