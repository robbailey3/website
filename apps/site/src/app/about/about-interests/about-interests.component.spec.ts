import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutInterestsComponent } from './about-interests.component';

describe('AboutInterestsComponent', () => {
  let component: AboutInterestsComponent;
  let fixture: ComponentFixture<AboutInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutInterestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
