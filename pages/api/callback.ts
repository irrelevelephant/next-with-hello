import { NextApiRequest, NextApiResponse } from 'next'
import { unsealData } from 'iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from 'lib/session'
import config from 'lib/config'
import { consentCors, consentBaseUrl } from 'lib/consent'
import type { User } from 'lib/user'

const defaultReturnTo = '/profile-sg'

const callbackRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    await consentCors(req, res)

    let sourceUrl = ''

    if (!req.session.user?.isLoggedIn) {
        const {
            id_token: idToken,
            state,
            error
        } = req.body

        if (error) {
            res.status(400).json({ message: error })
            return
        }

        if (!idToken) {
            res.status(400).json({ message: 'Missing id_token parameter' })
            return
        }

        if (!state) {
            res.status(400).json({ message: 'Missing state' })
            return
        }

        const unsealedState: Record<string, string> = await unsealData(state, sessionOptions)
        const { nonce } = unsealedState
        sourceUrl = unsealedState.sourceUrl

        try {
            const { sub, name, email }: Record<string, string> = await fetch(
                new URL('/oauth/introspect', consentBaseUrl).toString(), {
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
        } catch (error) {
            res.status(500).json({ message: (error as Error).message })
        }
    }

    const baseUrl = new URL(config.baseUrl)
    const dangerousReturnTo = sourceUrl || defaultReturnTo
    let safeReturnTo: URL
    try {
        safeReturnTo = new URL(dangerousReturnTo, baseUrl)
        if (safeReturnTo.origin === baseUrl.origin) {
            res.redirect(303, safeReturnTo.toString())
            return
        }
    } catch (e) {
    }

    res.redirect(303, new URL(defaultReturnTo, baseUrl).toString())
}

export default withIronSessionApiRoute(callbackRoute, sessionOptions)
