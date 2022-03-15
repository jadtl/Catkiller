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
        const statusesTextRaw = process.env.STATUSES_TEXT
        const statusesTypeRaw = process.env.STATUSES_TYPE
        if (!statusesTextRaw || !statusesTypeRaw) throw Error('Environment variables STATUSES_TEXT or STATUSES_TYPE missing!')
        const statusesText = statusesTextRaw.split(',')
        const statusesType = statusesTypeRaw.split(',')
        setStatus(client, statusesText, statusesType)
        setInterval(() => {
            setStatus(client, statusesText, statusesType)
        }, 300000)
    })
}

function setStatus(client: Client, statusesText: Array<string>, statusesType: Array<string>): void {
    if (!client) return
    if (!client.user) return
    const newStatus = Math.floor(Math.random() * statusesText.length);
    switch (statusesType[newStatus]) {
        case 'LISTENING':
            client.user.setActivity(statusesText[newStatus], { type: 'LISTENING' })
            break
        case 'WATCHING':
            client.user.setActivity(statusesText[newStatus], { type: 'WATCHING' })
            break
        case 'PLAYING':
            client.user.setActivity(statusesText[newStatus], { type: 'PLAYING' })
            break
    }
}