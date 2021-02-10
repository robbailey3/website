/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { Component } from '@angular/core';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';

import { AccordionComponent } from './accordion.component';

@Component({
  selector: 'rob-accordion-test-wrapper'
})
class AccordionTestWrapperComponent {}

describe('[COMPONENT]: AccordionComponent', () => {
  let spectator: SpectatorHost<
    AccordionComponent,
    AccordionTestWrapperComponent
  >;

  let component: AccordionComponent;

  const createHost = createHostFactory({
    component: AccordionComponent,
    host: AccordionTestWrapperComponent,
    declarations: [AccordionItemComponent],
    imports: [FontAwesomeModule]
  });

  beforeEach(() => {
    spectator = createHost(`
    <div style="width: 400px; max-width: 100%;">
      <rob-accordion>
        <rob-accordion-item title="Item 1" id="item-1"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          malesuada porttitor felis. Aenean a dolor tortor.</rob-accordion-item
        >
        <rob-accordion-item title="Item 2" id="item-2"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          malesuada porttitor felis. Aenean a dolor tortor.</rob-accordion-item
        >
        <rob-accordion-item title="Item 3" id="item-3"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          malesuada porttitor felis. Aenean a dolor tortor.</rob-accordion-item
        >
        <rob-accordion-item title="Item 4" id="item-4"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          malesuada porttitor felis. Aenean a dolor tortor.</rob-accordion-item
        >
      </rob-accordion>
    </div>
  `);
    component = spectator.component;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[METHOD]: setAccordionItemActive', () => {
    it('should correctly set the state of the provided accordionItem', () => {
      const accordionItem = component.accordionItems.last; // Let's use the last one
      expect(accordionItem.state).toEqual('closed');
      component.setAccordionItemActive(accordionItem);
      expect(accordionItem.state).toEqual('open');
    });

    it('should correctly set the focusedElementIndex property', () => {
      const accordionItem = component.accordionItems.last;
      const expectedIndex = component.accordionItems.length - 1;

      component.setAccordionItemActive(accordionItem);

      expect(component.focusedElementIndex).toEqual(expectedIndex);
    });
  });
  describe('[METHOD]: handleKeyup', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(component, 'handleKeyup');
    });
    it('should be called in response to a keyup event', () => {
      spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'ArrowRight');

      expect(spy).toHaveBeenCalled();
    });

    it('should move the focussed index to the next element when the ArrowDown key is pressed', () => {
      for (let i = 0; i < component.accordionItems.length; i += 1) {
        component.focusedElementIndex = i;
        const expectedIndex =
          i + 1 > component.accordionItems.length - 1 ? 0 : i + 1;

        spectator.dispatchKeyboardEvent(
          spectator.element,
          'keyup',
          'ArrowDown'
        );

        expect(component.focusedElementIndex).toEqual(expectedIndex);
      }
    });

    it('should call focusNextItem when the ArrowDown key is pressed', () => {
      const focusNextSpy = jest.spyOn<any, any>(component, 'focusNextItem');
      spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'ArrowDown');
      expect(focusNextSpy).toHaveBeenCalled();
    });

    it('should move the focussed index to the previous element when the ArrowUp key is pressed', () => {
      for (let i = 0; i < component.accordionItems.length; i += 1) {
        component.focusedElementIndex = i;

        const expectedIndex =
          i - 1 < 0 ? component.accordionItems.length - 1 : i - 1;

        spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'ArrowUp');

        expect(component.focusedElementIndex).toEqual(expectedIndex);
      }
    });

    it('should call focusPrevItem when the ArrowUp key is pressed', () => {
      const focusPreviousSpy = jest.spyOn<any, any>(
        component,
        'focusPreviousItem'
      );
      spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'ArrowUp');
      expect(focusPreviousSpy).toHaveBeenCalled();
    });

    it('should move the focussed index to the last element when the End key is pressed', () => {
      for (let i = 0; i < component.accordionItems.length; i += 1) {
        component.focusedElementIndex = i;
        const expectedIndex = component.accordionItems.length - 1;

        spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'End');

        expect(component.focusedElementIndex).toEqual(expectedIndex);
      }
    });

    it('should call focusLastItem when the End key is pressed', () => {
      const focusLastSpy = jest.spyOn<any, any>(component, 'focusLastItem');
      spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'End');
      expect(focusLastSpy).toHaveBeenCalled();
    });

    it('should move the focussed index to the first element when the Home key is pressed', () => {
      for (let i = 0; i < component.accordionItems.length; i += 1) {
        component.focusedElementIndex = i;
        const expectedIndex = 0;

        spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'Home');

        expect(component.focusedElementIndex).toEqual(expectedIndex);
      }
    });

    it('should call focusFirstItem when the Home key is pressed', () => {
      const focusFirstSpy = jest.spyOn<any, any>(component, 'focusFirstItem');
      spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'Home');
      expect(focusFirstSpy).toHaveBeenCalled();
    });

    it('should call the setFocus method when a relevant key is pressed', () => {
      ['ArrowUp', 'ArrowDown', 'Home', 'End'].forEach((key) => {
        const setFocusSpy = jest.spyOn<any, any>(component, 'setFocus');
        spectator.dispatchKeyboardEvent(spectator.element, 'keyup', key);

        expect(setFocusSpy).toHaveBeenCalled();
      });
    });
  });
});
