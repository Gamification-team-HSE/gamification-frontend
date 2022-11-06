import { boot } from 'quasar/wrappers'
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';

export default boot(({ app, router }) => {
  Sentry.init({
    app,
    dsn: 'https://35b24a8c8b834480b9e6bab649b4c3fa@o4504101310562304.ingest.sentry.io/4504101318885376',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', 'gamification-frontend.netlify.app', /^\//],
      }),
    ],

    tracesSampleRate: 1.0,
  });
});
