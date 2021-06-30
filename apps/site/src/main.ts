import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Sentry.init({
  dsn:
    'https://8d2072febf334859bdf7927128e44241@o368150.ingest.sentry.io/5713803',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://yourserver.io/api'],
      routingInstrumentation: Sentry.routingInstrumentation
    })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  beforeSend: (event) => {
    if (event.exception) {
      Sentry.showReportDialog({
        title: 'Looks like Rob has cocked something up! 💩',
        subtitle: 'Rob will be notified of this monumental error.',
        subtitle2:
          'Please fill out the stuff below so Rob can rectify this mistake.'
      });
    }
    return event;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
