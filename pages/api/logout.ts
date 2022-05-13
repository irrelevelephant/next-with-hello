import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from 'lib/session'
import config from 'lib/config'

const logoutRoute = (req: NextApiRequest, res: NextApiResponse) => {
    req.session.destroy()

    const baseUrl = new URL(config.baseUrl)
    res.redirect(baseUrl.toString())
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions)
