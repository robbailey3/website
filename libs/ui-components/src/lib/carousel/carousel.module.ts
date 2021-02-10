import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [CarouselComponent, CarouselItemComponent],
  imports: [CommonModule, ButtonsModule],
  exports: [CarouselComponent, CarouselItemComponent]
})
export class CarouselModule {}
