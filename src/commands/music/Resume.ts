import { BaseCommandInteraction, Client } from 'discord.js'
import * as Discord from '@discordjs/voice'

import { Command } from '../../Command'
import { nowPlaying, player } from '../state'

export const Resume: Command = {
    name: 'resume',
    description: 'Resumes the current song.',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        if (!interaction.guild) return
        const id = parseInt(interaction.guild.id)
        
        player[id].unpause()
        const song = nowPlaying[id]
        if (!song) {
            interaction.editReply({ content: 'No song to resume.' })
            return
        }
        interaction.editReply({ content: `Resuming **${song.title}**.` })
    }
}