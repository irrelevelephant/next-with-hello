import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Callback() {
    const { push } = useRouter()

    useEffect(() => {
        const handleHashChange = async () => {
            const params = new URLSearchParams(window.location.hash.substring(1))

            const idToken = params.get('id_token')
            const error = params.get('error')

            if (idToken) {
                push('/api/callback?' + new URLSearchParams({ idToken }))
            } else if (error) {
                push('/api/callback?' + new URLSearchParams({ error }))
            }
        }

        handleHashChange()

        window.addEventListener('hashchange', handleHashChange)

        return () => {
            window.removeEventListener('hashchange', handleHashChange)
        }
    }, [])

    return null
}
