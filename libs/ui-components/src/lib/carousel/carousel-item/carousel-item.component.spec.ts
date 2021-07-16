import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CarouselItemComponent } from './carousel-item.component';

describe('[COMPONENT]: CarouselItemComponent', () => {
  let component: CarouselItemComponent;
  let spectator: Spectator<CarouselItemComponent>;
  const componentFactory = createComponentFactory({
    component: CarouselItemComponent,
    imports: [BrowserAnimationsModule]
  });

  beforeEach(() => {
    spectator = componentFactory();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
