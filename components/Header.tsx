import Link from 'next/link'
import { useRouter } from 'next/router'

import useUser from 'lib/user'

export default function Header() {
    const { user } = useUser({ redirect: false })

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    {user?.isLoggedIn === false && (
                        <li>
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        </li>
                    )}
                    {user?.isLoggedIn === true && (
                        <>
                            <li>
                                <Link href="/profile-sg">
                                    <a>
                                        <span
                                            style={{
                                                marginRight: '.3em',
                                                verticalAlign: 'middle',
                                                borderRadius: '100%',
                                                overflow: 'hidden'
                                            }}>
                                        </span>
                                        Profile (Static Generation, recommended)
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile-ssr">
                                    <a>Profile (Server-side Rendering)</a>
                                </Link>
                            </li>
                            <li>
                                <a href="/api/logout">
                                    Logout
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <style jsx>{`
            ul {
              display: flex;
              list-style: none;
              margin-left: 0;
              padding-left: 0;
            }

            li {
              margin-right: 1rem;
              display: flex;
            }

            li:first-child {
              margin-left: auto;
            }

            a {
              color: #fff;
              text-decoration: none;
              display: flex;
              align-items: center;
            }

            header {
              padding: 0.2rem;
              color: #fff;
              background-color: #333;
            }
          `}</style>
        </header>
    )
}
