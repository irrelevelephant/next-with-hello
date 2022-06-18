import { InferGetServerSidePropsType } from 'next'
import { withHelloSsr, getUser, UpdateProfileButton } from 'nextjs-hello'

import Layout from 'components/Layout'

export default function SsrProfile({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <h1>Your profile</h1>
            <h2>
                This page uses{' '}
                <a href="https://nextjs.org/docs/basic-features/pages#server-side-rendering">
                    Server-side Rendering (SSR)
                </a>{' '}
                and{' '}
                <a href="https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props">
                    getServerSideProps
                </a>
            </h2>

            {user?.isLoggedIn && (
                <pre>{JSON.stringify(user, null, 2)}</pre>
            )}

            <UpdateProfileButton />
        </Layout>
    )
}

export const getServerSideProps = withHelloSsr(async ({ req }) => ({
    props: {
        user: getUser(req)
    }
}), { sourceUrl: '/profile-ssr' })
