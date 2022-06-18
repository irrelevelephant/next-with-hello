import Layout from 'components/Layout'
import { useUser, UpdateProfileButton } from 'nextjs-hello'

export default function SgProfile() {
    const { user } = useUser()

    return (
        <Layout>
            <h1>Your profile</h1>
            <h2>
                This page uses{' '}
                <a href="https://nextjs.org/docs/basic-features/pages#static-generation-recommended">
                    Static Generation (SG)
                </a>{' '}
                and the <a href="/api/auth/user">/api/auth/user</a> route (using{' '}
                <a href="https://github.com/vercel/swr">vercel/SWR</a>)
            </h2>

            {user && (
                <pre>{JSON.stringify(user, null, 2)}</pre>
            )}

            <UpdateProfileButton />
        </Layout>
    )
}
