import { Client, Guild } from 'discord.js'
import * as Discord from '@discordjs/voice'

import { Queue } from '../../data/Queue'
import { timeout, queue, player, nowPlaying } from '../../commands/state'
import error from '../audio/error'
import idle from '../audio/idle'

export default (client: Client): void => {
    client.on('guildCreate', async (guild: Guild) => {
        const id = parseInt(guild.id)
        // Update global variables for newly joined guild
        timeout[id] = undefined
        queue[id] = new Queue()
        player[id] = Discord.createAudioPlayer()
        error(player[id])
        idle(player[id], id)
        nowPlaying[id] = undefined
    })
}