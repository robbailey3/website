import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsModule } from '../../buttons/buttons.module';

import { NotificationComponent } from '../notification/notification.component';

import { NotificationContainerComponent } from './notification-container.component';

describe('NotificationContainerComponent', () => {
  let component: NotificationContainerComponent;
  let fixture: ComponentFixture<NotificationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationContainerComponent, NotificationComponent],
      imports: [ButtonsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
