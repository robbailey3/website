import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvSkillItemComponent } from './cv-skill-item.component';

describe('CvSkillItemComponent', () => {
  let component: CvSkillItemComponent;
  let fixture: ComponentFixture<CvSkillItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvSkillItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvSkillItemComponent);
    component = fixture.componentInstance;
    component.skill = { name: 'Something', rating: 50 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
