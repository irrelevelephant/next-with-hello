import { useRouter } from 'next/router'

export default function UpdateProfileButton() {
    const { push, asPath } = useRouter()

    const onSignIn = () => {
        push('/api/login?' + new URLSearchParams({
            returnTo: asPath,
            updateProfile: true.toString()
        }))
    }

    return (
        <button onClick={onSignIn} className="hello-btn-white-and-static">
            ō&nbsp;&nbsp;&nbsp;Update Profile with Hellō
        </button>
    )
}
