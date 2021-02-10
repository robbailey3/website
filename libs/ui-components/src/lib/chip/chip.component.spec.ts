import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ButtonsModule } from '../buttons/buttons.module';

import { ChipComponent } from './chip.component';

describe('[COMPONENT]: ChipComponent', () => {
  let spectator: Spectator<ChipComponent>;
  const createComponent = createComponentFactory({
    component: ChipComponent,
    imports: [ButtonsModule]
  });
  beforeEach(() => {
    spectator = createComponent();
  });
  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  describe('[METHOD]: onDismissClick', () => {
    it('should emit', () => {
      const spy = jest.spyOn(spectator.component.handleDismiss, 'emit');
      spectator.component.onDismissClick();
      expect(spy).toHaveBeenCalled();
    });
  });
});
