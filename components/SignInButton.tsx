import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SignInButton() {
    const [clicked, setClicked] = useState(false)
    const { push } = useRouter()

    const onSignIn = () => {
        setClicked(true)

        push('/api/login')
    }

    return (
        <button onClick={onSignIn} disabled={clicked} className={`hello-btn-black-on-light ${clicked ? 'hello-btn-loader' : ''}`}>
            ō&nbsp;&nbsp;&nbsp;Continue with Hellō
        </button>
    )
}
