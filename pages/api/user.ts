import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from 'lib/session'
import type { User } from 'lib/user'

const userRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
    if (req.session.user?.isLoggedIn) {
        // in a real world application you might read the user id from the session and then do a database request
        // to get more information on the user if needed
        res.json({
            ...req.session.user,
            isLoggedIn: true
        })
    } else {
        res.json({
            isLoggedIn: false
        })
    }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
