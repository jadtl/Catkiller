import { Client } from 'discord.js'
import 'dotenv/config'

import { Commands } from '../Commands'

export default (client: Client): void => {
    client.on('ready', async () => {
        if (!client.user || !client.application) return

        await client.application.commands.set(Commands)

        console.log(`${client.user.tag} entered the mainframe...`)
        //print bot stats
        console.log(`---STATS---\nServers: ${client.guilds.cache.size}\nUsers: ${client.guilds.cache
            .map((guild) => guild.memberCount)
            .reduce((p, c) => p + c)}\n-----------`)

        //update status
        const text = process.env.BOT_STATUS_TEXT
        const type = process.env.BOT_STATUS_TYPE
        if (!text || !type) throw Error('Environment variables BOT_STATUS_TEXT or BOT_STATUS_TYPE missing!')
        switch (type) {
            case 'LISTENING':
                client.user.setActivity(text, { type: 'LISTENING' })
                break
        }
    })
}