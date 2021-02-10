import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ButtonsModule } from '../buttons/buttons.module';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let spectator: Spectator<AlertComponent>;
  let component: AlertComponent;

  const componentFactory = createComponentFactory({
    component: AlertComponent,
    imports: [FontAwesomeModule, ButtonsModule]
  });

  beforeEach(() => {
    spectator = componentFactory();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have to correct class based on the variant', () => {
    ['info', 'warning', 'error', 'success'].forEach(
      (variant: 'info' | 'warning' | 'error' | 'success') => {
        component.variant = variant;
        spectator.fixture.detectChanges();

        const el = spectator.query('.alert');

        expect(el.classList).toContain(`alert-${variant}`);
      }
    );
  });
  it('should display the dismiss button if the component is dismissable', () => {
    component.dismissable = false;
    spectator.fixture.detectChanges();
    expect(spectator.query('.alert-dismiss')).toBeFalsy();

    component.dismissable = true;
    spectator.fixture.detectChanges();
    expect(spectator.query('.alert-dismiss')).toBeTruthy();
  });
  describe('[METHOD]: handleDismissClick', () => {
    it('should call component->close', () => {
      const spy = jest.spyOn(component, 'close');

      component.dismissable = true;
      spectator.fixture.detectChanges();

      const button = spectator.query<HTMLButtonElement>(
        '.alert-dismiss button'
      );

      spectator.dispatchMouseEvent(button, 'click');

      expect(spy).toHaveBeenCalled();
    });

    it('should set state to inactive when the dismiss button is clicked', () => {
      component.dismissable = true;
      spectator.fixture.detectChanges();

      const button = spectator.query<HTMLButtonElement>(
        '.alert-dismiss button'
      );
      spectator.dispatchMouseEvent(button, 'click');

      expect(component.state).toEqual('inactive');
    });
  });

  describe('[METHOD]: open', () => {
    it('should set state to active when the open method is called', () => {
      component.state = 'inactive';
      spectator.fixture.detectChanges();
      component.open();
      expect(component.state).toEqual('active');
    });
  });
});
