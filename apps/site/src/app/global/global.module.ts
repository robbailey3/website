import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiComponentsModule } from '@whisky-tracker/ui-components';
import { NgtUniversalModule, WINDOW } from '@ng-toolkit/universal';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, NavigationComponent, FooterComponent],
  imports: [CommonModule, RouterModule, UiComponentsModule],
  exports: [
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    NgtUniversalModule
  ]
})
export class GlobalModule {}
