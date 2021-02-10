import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { TabComponent } from './tab/tab.component';

import { TabsComponent } from './tabs.component';

@Component({ selector: 'rob-tabs-test-host' })
class TabsTestHostComponent {}

describe('TabsComponent', () => {
  let spectator: SpectatorHost<TabsComponent, TabsTestHostComponent>;
  const createHost = createHostFactory({
    component: TabsComponent,
    host: TabsTestHostComponent,
    declarations: [TabComponent]
  });
  beforeEach(() => {
    spectator = createHost(`<rob-tabs>
    <rob-tab title="Tab 1" id="tab-1">Foo</rob-tab>
    <rob-tab title="Tab 2" id="tab-2">Bar</rob-tab>
    <rob-tab title="Tab 3" id="tab-3">Baz</rob-tab>
    <rob-tab title="Tab 4" id="tab-4">Bang</rob-tab>
  </rob-tabs>`);
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  it('should correctly set the tab title according to the provided prop', () => {
    const tabTitles = spectator.queryAll('.tab-title') as HTMLButtonElement[];

    expect(tabTitles[0].innerHTML.trim()).toEqual('Tab 1');
    expect(tabTitles[1].innerHTML.trim()).toEqual('Tab 2');
    expect(tabTitles[2].innerHTML.trim()).toEqual('Tab 3');
    expect(tabTitles[3].innerHTML.trim()).toEqual('Tab 4');
  });

  it('should show the content from the first tab on initialisation', () => {
    const tabContent = spectator.query('.tab-content');
    expect(tabContent.innerHTML).toEqual('Foo');
  });
  describe('[METHOD]: handleKeypress', () => {
    beforeEach(() => {
      spectator.component.activeIndex = 0;
    });
    it('should call the handleKeypress method when a keyup event is fired', () => {
      const spy = jest.spyOn(spectator.component, 'handleKeypress');
      expect(spy).not.toHaveBeenCalled();
      spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'ArrowRight');
      expect(spy).toHaveBeenCalled();
    });

    it('should move to the next tab if the RightArrow key is pressed', () => {
      const currentIndex = spectator.component.activeIndex;
      const expectedIndex =
        currentIndex + 1 >= spectator.component.tabs.length
          ? 0
          : currentIndex + 1;
      spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'ArrowRight');
      expect(spectator.component.activeIndex).toEqual(expectedIndex);
    });

    it('should wrap back to the first tab if the ArrowRight key is pressed and the last tab is active', () => {
      spectator.component.activeIndex = spectator.component.tabs.length - 1;
      spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'ArrowRight');
      expect(spectator.component.activeIndex).toEqual(0);
    });

    it('should move to the last tab if the ArrowLeft key is pressed and the last tab is active', () => {
      spectator.component.activeIndex = 0;
      spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'ArrowLeft');
      expect(spectator.component.activeIndex).toEqual(
        spectator.component.tabs.length - 1
      );
    });

    it('should move to the previous tab if the LeftArrow key is pressed', () => {
      const currentIndex = spectator.component.activeIndex;
      const expectedIndex =
        currentIndex - 1 < 0
          ? spectator.component.tabs.length - 1
          : currentIndex - 1;
      spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'ArrowLeft');
      expect(spectator.component.activeIndex).toEqual(expectedIndex);
    });

    it('should move to the first tab if the Home key is pressed', () => {
      spectator.component.activeIndex = 2;
      spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'Home');
      expect(spectator.component.activeIndex).toEqual(0);
    });
    it('should move to the last tab if the End key is pressed', () => {
      spectator.dispatchKeyboardEvent(spectator.element, 'keyup', 'End');
      expect(spectator.component.activeIndex).toEqual(3);
    });
    it('should not move anywhere if the shift key is pressed', () => {
      spectator.keyboard.pressKey('shift.ArrowRight');
      expect(spectator.component.activeIndex).toEqual(0);
    });
    it('should not move anywhere if the shift key is pressed', () => {
      spectator.keyboard.pressKey('ctrl.ArrowRight');
      expect(spectator.component.activeIndex).toEqual(0);
    });
  });
  describe('[METHOD]: setActiveTab', () => {
    it('should set the property activeTab', () => {
      spectator.component.activeIndex = 0; // Just making sure it's not already 1.
      spectator.component.setActiveTab(1);
      expect(spectator.component.activeIndex).toEqual(1);
    });

    it('should throw an error when the id is out of range', () => {
      expect(() => spectator.component.setActiveTab(100)).toThrowError();
    });
  });
  describe('[METHOD]: deactivateAll', () => {
    it('should deactivate all tabs', () => {
      // Set Up Scenario
      spectator.component.tabs.forEach((tab) => {
        tab.isActive = true;
      }); // Let's active them all, for fun

      spectator.component.deactivateAll();

      spectator.component.tabs.forEach((tab) => {
        expect(tab.isActive).toEqual(false);
      });
    });
  });
});
