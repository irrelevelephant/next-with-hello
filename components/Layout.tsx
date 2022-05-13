import { PropsWithChildren } from 'react'
import Head from 'next/head'

import Header from 'components/Header'

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <>
            <Head>
                <title>With Hellō</title>
                <link href="https://cdn.hello.coop/css/hello-button.css" rel="stylesheet" />
            </Head>
            <style jsx global>{`
            *,
            *::before,
            *::after {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              color: #333;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
                'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
            }

            .container {
              max-width: 65rem;
              margin: 1.5rem auto;
              padding-left: 1rem;
              padding-right: 1rem;
            }
          `}</style>

            <Header />

            <main>
                <div className="container">{children}</div>
            </main>
        </>
    )
}
