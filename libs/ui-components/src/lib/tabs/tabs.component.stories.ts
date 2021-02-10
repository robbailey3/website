import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs.component';

export default {
  title: 'Tabs'
};
export const Tabs = (args: TabsComponent) => ({
  moduleMetadata: {
    declarations: [TabsComponent, TabComponent]
  },
  template: `
  <rob-tabs>
    <rob-tab title="Tab 1" id="tab-1">Foo</rob-tab>
    <rob-tab title="Tab 2" id="tab-2">Bar</rob-tab>
    <rob-tab title="Tab 3" id="tab-3">Baz</rob-tab>
    <rob-tab title="Tab 4" id="tab-4">Bang</rob-tab>
  </rob-tabs>`,
  props: { ...args }
});
