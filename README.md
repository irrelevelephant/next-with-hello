# Example application using [`Hellō`](https://www.hello.dev/)

<p align="center"><b>👀 Online demo at <a href="https://next-with-hello.vercel.app/">https://next-with-hello.vercel.app</a></b></p>

---

This example creates an authentication system that uses [Hellō](https://www.hello.dev/) for user login and retrieving user claims. User data is then stored in a signed and encrypted session cookie with [`iron-session`](https://github.com/vvo/iron-session). The authentication and session functionality is implemented in [`nextjs-hello`](https://github.com/irrelevelephant/nextjs-hello) - see that package's README for more documentation.

It is based off the <a href="https://github.com/hellocoop/greenfielddemo">Single Page Hellō Demo App</a> and the
<a href="https://github.com/vercel/next.js/tree/canary/examples/with-iron-session">with-iron-session</a> Next.js example.

**Features of the example:**

- Login and update the user's profile with Hellō.
- Login redirects and return URLs for both statically generated and server-side rendered pages.
- The logged in status is synchronized between browser windows/tabs using the **`useUser`** hook.
- Session data is signed and encrypted in a cookie.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/irrelevelephant/next-with-hello&project-name=next-with-hello&repository-name=next-with-hello)

Several environment variables should be configured in Vercel:

1. If you have not yet set the `HELLO_CLIENT_ID` environment variable, you'll be prompted to create a new [quickstart application](http://quickstart.hello.dev/) upon login. In development, the client ID will be automatically written to the `.env` files. In production, you'll need to set the `HELLO_CLIENT_ID` environment variable to the client ID provided by Hellō and redeploy.
2. Set the `HELLO_BASE_URL` environment variable to your app's Vercel URL, e.g. `https://next-with-hello.vercel.app`.
3. Set the `HELLO_SESSION_SECRET` to a random string.

You can view/configure your Hellō application via the [Hellō developer console](https://console.hello.dev/).

## Development

1. Clone the repo/deploy your own. (You'll have to fork the repo if you want to submit PRs)
2. `yarn install`
  - You might have to update node with `nvm install --lts` and `nvm use --lts`
3. `yarn dev`
