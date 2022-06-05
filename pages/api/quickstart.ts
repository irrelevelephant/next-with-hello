import { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'path'
import { readFile, writeFile } from 'node:fs/promises'

import config from 'lib/config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (process.env.NODE_ENV === 'production') {
        res.status(404).end()
        return
    }

    const { query: { client_id } } = req
    const clientId = Array.isArray(client_id) ? client_id[0] : client_id

    if (!clientId) {
        res.status(400).json({ message: 'Missing client_id parameter' })
        return
    }

    process.env.HELLO_CLIENT_ID = clientId

    const files = ['.env.development', '.env.production']
    await Promise.all(files.map(async (envFile) => {
        const envFilePath = resolve(__filename, '../../../../../', envFile)
        const lines = (await readFile(envFilePath)).toString().split('\n')
        const clientIdIndex = lines.findIndex((line) => line.split('=')[0] === 'HELLO_CLIENT_ID')
        if (clientIdIndex < 0) {
            lines.push(`HELLO_CLIENT_ID=${clientId}`)
        } else {
            lines[clientIdIndex] = lines[clientIdIndex].replace(/^(.*)=(.*)$/, `$1=${clientId}`)
        }
        await writeFile(envFilePath, lines.join('\n'))
    }))

    res.redirect(303, config.baseUrl)
}
