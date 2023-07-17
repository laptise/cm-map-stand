# Next-on-Nest

Next.js on Nest.js

This provides Next.js on Nest.js in single repository.

No needs Docker, this runs in single process.

All command are available.

Use this for freely, Then if you like this, just give me a star!

Next.js package is located in `client` directory.

Nest.js package is located in `server` directory.

Tests are located in `test` directory.

## Behaviour

general behaviours

### Route

- `/*` all routes are routed to Next.js

- `/api` is Routed to Nest.js

- also `/public` is served to static files for next.js

So if you call `/api`, then it calls `AppController.getHello`
And if you call `/`, then the `client/pages/index.tsx` will be displayed

### Port

If you set on PORT in env, then it will runs on specified PORT
