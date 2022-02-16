import { Client } from 'discord.js'
import * as Discord from '@discordjs/voice'

import { Commands } from '../../Commands'
import { Queue } from '../../data/Queue'
import { timeout, queue, player, nowPlaying } from '../../commands/state'
import error from '../audio/error'
import idle from '../audio/idle'

export default (client: Client): void => {
    client.on('ready', async () => {
        if (!client.user || !client.application) return

        //initialize global variables
        client.guilds.cache.each(guild => {
            const id = parseInt(guild.id)
            timeout[id] = undefined
            queue[id] = new Queue()
            player[id] = Discord.createAudioPlayer()
            //register audio player listeners
            error(player[id])
            idle(player[id], id)
            nowPlaying[id] = undefined
        })

        //register commands
        await client.application.commands.set(Commands)
        console.log(`${client.user.tag} entered the mainframe...`)

        //print bot stats
        console.log(`---STATS---\nServers: ${client.guilds.cache.size}\nUsers: ${client.guilds.cache
            .map((guild) => guild.memberCount)
            .reduce((p, c) => p + c)}\n-----------`)

        //update status
        const text = process.env.STATUS_TEXT
        const type = process.env.STATUS_TYPE
        if (!text || !type) throw Error('Environment variables BOT_STATUS_TEXT or BOT_STATUS_TYPE missing!')
        switch (type) {
            case 'LISTENING':
                client.user.setActivity(text, { type: 'LISTENING' })
                break
        }
    })
}