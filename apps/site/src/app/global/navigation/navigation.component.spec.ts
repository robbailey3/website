import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { UiComponentsModule } from '@website/ui-components';
import { AuthService } from '../../auth/auth.service';

import { NavigationComponent } from './navigation.component';

jest.mock('../../auth/auth.service');

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [RouterTestingModule, NgtUniversalModule, UiComponentsModule],
      providers: [AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
