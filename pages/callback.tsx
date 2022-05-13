import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Callback() {
    const { push } = useRouter()

    useEffect(() => {
        const handleHashChange = async () => {
            const params = new URLSearchParams(window.location.hash.substring(1))

            const idToken = params.get('id_token')
            if (idToken) {
                push('/api/callback?' + new URLSearchParams({ idToken }))
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
