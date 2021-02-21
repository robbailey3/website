import { NgtUniversalModule } from '@ng-toolkit/universal';
import { moduleMetadata, Story } from '@storybook/angular';
import { IntersectionObserverDirective } from '../intersection-observer/intersection-observer.directive';
import { LazyImageComponent } from './lazy-image.component';

export default {
  title: 'Lazy Image',
  component: LazyImageComponent,
  decorators: [
    moduleMetadata({
      declarations: [LazyImageComponent, IntersectionObserverDirective],
      imports: [NgtUniversalModule]
    })
  ]
};

const Template: Story<LazyImageComponent> = (args: LazyImageComponent) => {
  return {
    component: LazyImageComponent,
    props: { ...args },
    template: `<rob-lazy-image [src]="src" [thumbnailSrc]="thumbnailSrc" [alt]="alt" [loadOn]="loadOn"></rob-lazy-image>`
  };
};

export const LazyImage: Story<LazyImageComponent> = Template.bind({});

LazyImage.args = {
  src: 'https://www.cats.org.uk/media/3236/choosing-a-cat.jpg',
  thumbnailSrc: 'https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF.jpg',
  alt: 'Image alt',
  loadOn: 'scroll'
};

LazyImage.argTypes = {
  state: {
    control: {
      type: 'select',
      options: ['open', 'closed']
    }
  }
};
