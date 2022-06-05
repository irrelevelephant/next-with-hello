import { useState } from 'react'
import { useRouter } from 'next/router'

export default function UpdateProfileButton() {
    const [clicked, setClicked] = useState(false)
    const { push, asPath } = useRouter()

    const onSignIn = () => {
        setClicked(true)
        push('/api/login?' + new URLSearchParams({
            sourceUrl: asPath,
            updateProfile: true.toString()
        }))
    }

    return (
        <button onClick={onSignIn} disabled={clicked} className={`hello-btn-white-and-static ${clicked ? 'hello-btn-loader' : ''}`}>
            ō&nbsp;&nbsp;&nbsp;Update Profile with Hellō
        </button>
    )
}
