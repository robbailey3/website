import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationsService } from './notifications/notifications.service';
import { FormItemsModule } from './form-items/form-items.module';
import { ButtonsModule } from './buttons/buttons.module';
import { ModalComponent } from './modal/modal.component';
import { ChipComponent } from './chip/chip.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { AccordionModule } from './accordion/accordion.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CardComponent } from './card/card.component';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { FocusTrapDirective } from './focus-trap/focus-trap.directive';
import { AlertComponent } from './alert/alert.component';
import { LazyImageComponent } from './lazy-image/lazy-image.component';
import { IntersectionObserverDirective } from './intersection-observer/intersection-observer.directive';
import { CarouselModule } from './carousel/carousel.module';
import { LoaderModule } from './loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonsModule,
    FontAwesomeModule,
    FormItemsModule,
    CarouselModule,
    LoaderModule
  ],
  exports: [
    AccordionModule,
    ButtonsModule,
    FontAwesomeModule,
    FormItemsModule,
    NotificationsModule,
    ChipComponent,
    FormItemsModule,
    ModalComponent,
    CardComponent,
    TooltipDirective,
    FocusTrapDirective,
    AlertComponent,
    LazyImageComponent,
    IntersectionObserverDirective,
    CarouselModule,
    LoaderModule
  ],
  providers: [NotificationsService],
  declarations: [
    ModalComponent,
    ChipComponent,
    TooltipComponent,
    CardComponent,
    TooltipDirective,
    FocusTrapDirective,
    AlertComponent,
    LazyImageComponent,
    IntersectionObserverDirective
  ]
})
export class UiComponentsModule {}
