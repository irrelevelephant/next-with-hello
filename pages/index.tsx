import Layout from 'components/Layout'
import { SignInButton } from 'nextjs-hello'

export default function Home() {
    return (
        <Layout>
            <h1>
                <a href="https://www.hello.dev/">Hellō</a> and <a href="https://github.com/vvo/iron-session">iron-session</a> -
                Authentication example
            </h1>

            <p>
                This example demonstrates how to set up user authentication with
                {' '}<a href="https://www.hello.dev/">Hellō</a> and session management with
                {' '}<a href="https://github.com/vvo/iron-session">iron-session</a>.
                It is based off the
                {' '}<a href="https://github.com/vercel/next.js/tree/canary/examples/with-iron-session">with-iron-session</a>{' '}
                example, which uses a signed and encrypted cookie to store session data.
            </p>

            <p>
                To authenticate with Hellō, click the button below.
            </p>

            <div className="login">
                <SignInButton />
            </div>
            <style jsx>{`
            .login {
              display: flex;
              justify-content: center;
              margin: 0 auto;
              padding: 1rem;
            }
          `}</style>

            <h2>Features</h2>

            <ul>
                <li>User authentication and profile management with Hellō</li>
                <li>Logged in status synchronized between browser windows/tabs</li>
                <li>Layout based on logged in status</li>
                <li>All pages are static</li>
                <li>Session data is signed and encrypted in a cookie</li>
            </ul>

            <h2>Steps to test the functionality:</h2>

            <ol>
                <li>Click <b>Continue with Hellō</b></li>
                <li>
                    Click home and click profile again, notice how your session is being
                    used through a token stored in a cookie.
                </li>
                <li>
                    Update your profile by clicking <b>Update Profile with Hellō</b>
                </li>
                <li>
                    Click logout and try to go to the profile page again. You&apos;ll get
                    redirected to the Hellō consent URL.
                </li>
            </ol>
            <style jsx>{`
            li {
              margin-bottom: 0.5rem;
            }
          `}</style>
        </Layout>
    )
}
