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
        <button onClick={onSignIn} disabled={clicked} className="hello-btn-dark">
            {clicked
                ? <img src="https://cdn.hello.coop/images/spin-light.svg" height="25" width="25" />
                : 'ō Continue with Hellō'}
        </button>
    )
}
