import { BaseCommandInteraction, Client } from 'discord.js'
import * as Discord from '@discordjs/voice'

import { Command } from '../../Command'
import { nowPlaying, player } from '../state'

export const Skip: Command = {
    name: 'skip',
    description: 'Skips the current song.',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        if (!interaction.guild) return
        const id = parseInt(interaction.guild.id)
        
        player[id].stop()
        const song = nowPlaying[id]
        if (!song) {
            interaction.editReply({ content: 'No song to skip.' })
        } else {
            nowPlaying[id] = undefined
            interaction.editReply({ content: `Skipped **${song.title}**.` })
        }
    }
}