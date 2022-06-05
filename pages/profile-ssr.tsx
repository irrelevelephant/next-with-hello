import { InferGetServerSidePropsType } from 'next'
import { withIronSessionSsr } from 'iron-session/next'

import Layout from 'components/Layout'
import { sessionOptions } from 'lib/session'
import UpdateProfileButton from 'components/UpdateProfileButton'
import type { User } from 'lib/user'

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

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
    const user = req.session.user

    if (!user) {
        // when redirecting from the consent URL, we won't have the session cookie due to strict SameSite
        // to prevent an infinite redirect loop, we redirect to /profile-sg instead
        res.setHeader('location', '/api/login?' + new URLSearchParams({ sourceUrl: '/profile-sg' }))
        res.statusCode = 302
        res.end()
        return {
            props: {
                user: {
                    isLoggedIn: false
                } as User
            }
        }
    }

    return {
        props: {
            user
        }
    }
}, sessionOptions)
