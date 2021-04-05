import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRootComponent } from './about-root.component';

describe('AboutRootComponent', () => {
  let component: AboutRootComponent;
  let fixture: ComponentFixture<AboutRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutRootComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
