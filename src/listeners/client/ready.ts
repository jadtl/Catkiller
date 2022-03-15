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

        // Initialize global variables
        client.guilds.cache.each(guild => {
            const id = parseInt(guild.id)
            timeout[id] = undefined
            queue[id] = new Queue()
            player[id] = Discord.createAudioPlayer()
            // Register audio player listeners
            error(player[id])
            idle(player[id], id)
            nowPlaying[id] = undefined
        })

        // Register commands
        await client.application.commands.set(Commands)
        console.log(`${client.user.tag} entered the mainframe...`)

        // Print bot stats
        console.log(`---STATS---\nServers: ${client.guilds.cache.size}\nUsers: ${client.guilds.cache
            .map((guild) => guild.memberCount)
            .reduce((p, c) => p + c)}\n-----------`)

        // Update status
        const statuses_text_raw = process.env.STATUSES_TEXT
        const statuses_type_raw = process.env.STATUSES_TYPE
        if (!statuses_text_raw || !statuses_type_raw) throw Error('Environment variables STATUSES_TEXT or STATUSES_TYPE missing!')
        const statuses_text = statuses_text_raw.split(',')
        const statuses_type = statuses_type_raw.split(',')
        setInterval(() => {
            if (!client) return
            if (!client.user) return
            const new_status = Math.floor(Math.random() * (statuses_text.length - 1) + 1);
            switch (statuses_type[new_status]) {
                case 'LISTENING':
                    client.user.setActivity(statuses_text[new_status], { type: 'LISTENING' })
                    break
                case 'WATCHING':
                    client.user.setActivity(statuses_text[new_status], { type: 'WATCHING' })
                    break
                case 'PLAYING':
                    client.user.setActivity(statuses_text[new_status], { type: 'PLAYING' })
                    break
            }
        }, 60000)
    })
}