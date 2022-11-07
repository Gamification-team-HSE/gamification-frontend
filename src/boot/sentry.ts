import { boot } from 'quasar/wrappers'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'

export default boot(({ app, router }) => {
  if (!process.env.SENTRY_DSN) return

  Sentry.init({
    app,
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: [process.env.SENTRY_ORIGIN, /^\//],
      }),
    ],

    tracesSampleRate: 1.0,
  })

  // eslint-disable-next-line no-console
  console.log('Sentry setup success.')
})
