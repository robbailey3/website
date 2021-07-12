import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBasicsComponent } from './about-basics.component';

describe('AboutBasicsComponent', () => {
  let component: AboutBasicsComponent;
  let fixture: ComponentFixture<AboutBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutBasicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
