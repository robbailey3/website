import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ButtonsModule } from '../buttons/buttons.module';
import { FocusTrapDirective } from '../focus-trap/focus-trap.directive';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let spectator: Spectator<ModalComponent>;
  let component: ModalComponent;

  const componentFactory = createComponentFactory({
    component: ModalComponent,
    declarations: [FocusTrapDirective],
    imports: [ButtonsModule]
  });

  beforeEach(() => {
    spectator = componentFactory();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[METHOD]: close', () => {
    it('should be defined', () => {
      expect(component.close).toBeDefined();
    });

    it('should set the state of the modal component to "closed"', () => {
      component.state = 'open';
      component.close();

      expect(component.state).toEqual('closed');
    });

    it('should keep the state as closed if it is already', () => {
      component.state = 'closed';
      component.close();

      expect(component.state).toEqual('closed');
    });
  });

  describe('[METHOD]: onKeyup', () => {
    it('should be defined', () => {
      expect(component.onKeyup).toBeDefined();
    });

    it('should call Modal->close if the Event key is "Escape"', () => {
      const spy = jest.spyOn(component, 'close');
      component.onKeyup(new KeyboardEvent('keyup', { key: 'Escape' }));
      expect(spy).toHaveBeenCalled();
    });
    it('should NOT call Modal->close if the Event key is NOT "Escape"', () => {
      const spy = jest.spyOn(component, 'close');
      component.onKeyup(new KeyboardEvent('keyup', { key: 'Enter' }));
      expect(spy).not.toHaveBeenCalled();
    });

    it('should be called in response to a window:keyup event', () => {
      const spy = jest.spyOn(component, 'onKeyup');
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
      expect(spy).toHaveBeenCalled();
    });
  });
});
