# Example application using [`Hellō`](https://www.hello.dev/) and [`iron-session`](https://github.com/vvo/iron-session)

<p align="center"><b>👀 Online demo at <a href="https://next-with-hello.vercel.app/">https://next-with-hello.vercel.app</a></b></p>

---

This example creates an authentication system that uses [Hellō](https://www.hello.dev/) for user login and retrieving user claims. User data is then stored in a signed and encrypted session cookie with [`iron-session`](https://github.com/vvo/iron-session).

It is based off the <a href="https://github.com/hellocoop/greenfielddemo">Single Page Hellō Demo App</a> and the
<a href="https://github.com/vercel/next.js/tree/canary/examples/with-iron-session">with-iron-session</a> example.

**Features of the example:**

- Login and update the user's profile with Hellō.
- Login redirects and return URLs for both statically generated and server-side rendered pages.
- The logged in status is synchronized between browser windows/tabs using the **`useUser`** hook and the [`swr`](https://swr.vercel.app/).
- Session data is signed and encrypted in a cookie.

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/irrelevelephant/next-with-hello&project-name=next-with-hello&repository-name=next-with-hello)

Use the [Hellō developer console](https://console.hello.dev/) to create your own Hellō application. The client ID is configured via environment variables.
