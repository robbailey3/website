import { ButtonsModule } from '../buttons/buttons.module';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { CarouselComponent } from './carousel.component';

export default {
  title: 'Carousel'
};

export const Carousel = (args: CarouselComponent) => ({
  moduleMetadata: {
    imports: [ButtonsModule],
    declarations: [CarouselComponent, CarouselItemComponent]
  },
  template: `
  <rob-carousel [interval]="interval">
    <rob-carousel-item><h1>Item 1</h1></rob-carousel-item>
    <rob-carousel-item><h1>Item 2</h1></rob-carousel-item>
    <rob-carousel-item><h1>Item 3</h1></rob-carousel-item>
    <rob-carousel-item><h1>Item 4</h1></rob-carousel-item>
  </rob-carousel>`,
  props: { ...args }
});

Carousel.args = {
  interval: 1000
};
