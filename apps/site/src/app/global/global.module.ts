import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiComponentsModule } from '@website/ui-components';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [HeaderComponent, NavigationComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    UiComponentsModule,
    AdminModule,
    AuthModule
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    NgtUniversalModule
  ]
})
export class GlobalModule {}
