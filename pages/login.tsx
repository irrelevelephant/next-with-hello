import Layout from 'components/Layout'
import SignInButton from 'components/SignInButton'

export default function Login() {
    return (
        <Layout>
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
        </Layout>
    )
}
