import { boot } from 'quasar/wrappers'
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';

export default boot(({ app, router }) => {
  if (!process.env.sentryDSN) return

  Sentry.init({
    app,
    dsn: process.env.sentryDSN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: [process.env.sentryOrigin, /^\//],
      }),
    ],

    tracesSampleRate: 1.0,
  });
});
