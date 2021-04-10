// eslint-disable-next-line import/order
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { UiComponentsModule } from '@website/ui-components';
import { HttpClientModule } from '@angular/common/http';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import * as Sentry from '@sentry/angular';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { GlobalModule } from './global/global.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { HomepageModule } from './homepage/homepage.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    GlobalModule,
    AuthModule,
    HttpClientModule,
    HomepageModule,
    UiComponentsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true
      })
    },
    {
      provide: Sentry.TraceService,
      deps: [Router]
    },
    {
      provide: APP_INITIALIZER,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
