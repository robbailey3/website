import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvJsonComponent } from './cv-json.component';

describe('CvJsonComponent', () => {
  let component: CvJsonComponent;
  let fixture: ComponentFixture<CvJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
