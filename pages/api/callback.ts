import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from 'lib/session'
import config from 'lib/config'
import type { User } from 'lib/user'

const consentBaseUrl = new URL('https://consent.hello.coop')

type Claims = {
    sub: string,
    name: string,
    email: string
}

const defaultReturnTo = '/'

const callbackRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query: { idToken } } = req

    if (typeof idToken !== 'string') {
        res.status(400).json({ message: 'Missing id_token parameter' })
        return
    }

    const nonce = req.session.nonce
    if (!nonce) {
        res.status(400).json({ message: 'Missing session nonce' })
        return
    }

    try {
        const { sub, name, email }: Claims = await fetch(new URL('/oauth/introspect', consentBaseUrl).toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id_token=${idToken}&nonce=${nonce}&client_id=${config.helloClientId}`
        }).then((r) => r.json())

        const user: User = {
            isLoggedIn: true,
            sub,
            name,
            email
        }

        req.session.user = user
        await req.session.save()

        const baseUrl = new URL(config.baseUrl)
        const dangerousReturnTo = req.session.returnTo || defaultReturnTo
        let safeReturnTo: URL
        try {
            safeReturnTo = new URL(dangerousReturnTo, baseUrl)
            if (safeReturnTo.origin === baseUrl.origin) {
                res.redirect(safeReturnTo.toString())
                return
            }
        } catch (e) {
        }

        res.redirect(new URL(baseUrl, defaultReturnTo).toString())
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(callbackRoute, sessionOptions)
