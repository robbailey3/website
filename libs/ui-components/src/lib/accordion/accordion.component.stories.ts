/* eslint-disable max-len */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionComponent } from './accordion.component';

export default {
  title: 'Accordion'
};
export const Accordion = (args: AccordionComponent) => ({
  moduleMetadata: {
    imports: [FontAwesomeModule, BrowserAnimationsModule],
    declarations: [AccordionComponent, AccordionItemComponent]
  },
  template: `
  <div style="width: 400px; max-width: 100%;">
  <rob-accordion>
    <rob-accordion-item title="Item 1" id="item-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada porttitor felis. Aenean a dolor tortor. Curabitur vel ipsum eu lectus tincidunt tincidunt at egestas sapien. Pellentesque dictum tellus id sem commodo dapibus. Nunc venenatis odio non massa dignissim malesuada. Duis ut congue tellus. Quisque lorem diam, congue vitae tellus ac, tempor ultrices urna. Nulla consequat lorem id lorem rutrum, et ullamcorper ipsum mollis.</rob-accordion-item>
    <rob-accordion-item title="Item 2" id="item-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada porttitor felis. Aenean a dolor tortor. Curabitur vel ipsum eu lectus tincidunt tincidunt at egestas sapien. Pellentesque dictum tellus id sem commodo dapibus. Nunc venenatis odio non massa dignissim malesuada. Duis ut congue tellus. Quisque lorem diam, congue vitae tellus ac, tempor ultrices urna. Nulla consequat lorem id lorem rutrum, et ullamcorper ipsum mollis.</rob-accordion-item>
    <rob-accordion-item title="Item 3" id="item-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada porttitor felis. Aenean a dolor tortor. Curabitur vel ipsum eu lectus tincidunt tincidunt at egestas sapien. Pellentesque dictum tellus id sem commodo dapibus. Nunc venenatis odio non massa dignissim malesuada. Duis ut congue tellus. Quisque lorem diam, congue vitae tellus ac, tempor ultrices urna. Nulla consequat lorem id lorem rutrum, et ullamcorper ipsum mollis.</rob-accordion-item>
    <rob-accordion-item title="Item 4" id="item-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada porttitor felis. Aenean a dolor tortor. Curabitur vel ipsum eu lectus tincidunt tincidunt at egestas sapien. Pellentesque dictum tellus id sem commodo dapibus. Nunc venenatis odio non massa dignissim malesuada. Duis ut congue tellus. Quisque lorem diam, congue vitae tellus ac, tempor ultrices urna. Nulla consequat lorem id lorem rutrum, et ullamcorper ipsum mollis.</rob-accordion-item>
  </rob-accordion>
  </div>
  `,
  props: { ...args }
});
