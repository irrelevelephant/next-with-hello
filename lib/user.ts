import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export type User = {
    isLoggedIn: false
} | {
    isLoggedIn: true,
    sub: string,
    name: string,
    email: string
}

export default function useUser({ redirect = true } = {}) {
    const { data: user, mutate: mutateUser } = useSWR<User>('/api/user')
    const { push, isReady, asPath } = useRouter()

    useEffect(() => {
        if (!user || !isReady) return

        if (!user.isLoggedIn && redirect) {
            push('/api/login?' + new URLSearchParams({ returnTo: asPath }))
        }
    }, [user, isReady, asPath])

    return { user, mutateUser }
}
