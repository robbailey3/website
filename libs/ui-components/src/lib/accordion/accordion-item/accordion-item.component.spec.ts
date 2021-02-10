import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionItemComponent } from './accordion-item.component';

describe('AccordionItemComponent', () => {
  let component: AccordionItemComponent;
  let spectator: Spectator<AccordionItemComponent>;
  const createComponent = createComponentFactory({
    component: AccordionItemComponent,
    imports: [FontAwesomeModule, BrowserAnimationsModule]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[OUTPUT]: accordionClick', () => {
    it('should call accordionClick.next when the button is clicked', () => {
      const spy = jest.spyOn(component.accordionClick, 'next');

      spectator.dispatchMouseEvent(
        component.accordionButton.nativeElement,
        'click'
      );

      expect(spy).toHaveBeenCalled();
    });
  });
});
