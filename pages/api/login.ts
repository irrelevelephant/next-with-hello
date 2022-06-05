import { NextApiRequest, NextApiResponse } from 'next'
import { sealData } from 'iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'
import { v4 as uuidv4 } from 'uuid'

import { sessionOptions } from 'lib/session'
import config from 'lib/config'

const consentBaseUrl = 'https://consent.hello.coop'

const defaultScopes = ['openid', 'name', 'email']

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { sourceUrl, updateProfile } = req.query

    const nonce = uuidv4()
    req.session.nonce = nonce
    req.session.sourceUrl = Array.isArray(sourceUrl) ? sourceUrl[0] : sourceUrl
    await req.session.save()
    const state = await sealData({
        nonce,
        sourceUrl: Array.isArray(sourceUrl) ? sourceUrl[0] : sourceUrl
    }, sessionOptions)

    const baseUrl = new URL(config.baseUrl)
    const callbackUrl = new URL('/api/callback', baseUrl)

    const scope = (defaultScopes.concat(updateProfile === true.toString()
        ? ['profile_update']
        : [])).join(' ')

    const consentUrl = new URL(consentBaseUrl)
    consentUrl.searchParams.append('client_id', config.helloClientId)
    consentUrl.searchParams.append('redirect_uri', callbackUrl.toString())
    consentUrl.searchParams.append('scope', scope)
    consentUrl.searchParams.append('nonce', nonce)
    consentUrl.searchParams.append('state', state)
    consentUrl.searchParams.append('response_type', 'id_token')
    consentUrl.searchParams.append('response_mode', 'form_post')

    res.redirect(consentUrl.toString())
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
