import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '../buttons/buttons.module';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

export default {
  title: 'Tooltip'
};

export const Tooltip = (args: {
  tooltipText: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}) => ({
  moduleMetadata: {
    imports: [ButtonsModule, BrowserAnimationsModule],
    declarations: [TooltipComponent, TooltipDirective],
    entryComponents: [TooltipComponent]
  },
  template: `<rob-button 
  label="Hello World"
  variant="primary"
  [robTooltip]="tooltipText"
  [tooltipPosition]="position"
  [delay]="delay"></rob-button>`,
  props: { ...args }
});

Tooltip.args = {
  tooltipText: 'Tooltip',
  position: 'top',
  delay: 0
};

Tooltip.argTypes = {
  position: {
    control: {
      type: 'select',
      options: ['top', 'bottom', 'left', 'right']
    }
  }
};
