import { BaseCommandInteraction, Client } from 'discord.js'

import { Command } from '../../Command'
import { nowPlaying, player } from '../state'

export const Pause: Command = {
    name: 'pause',
    description: 'Pauses the current song.',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        if (!interaction.guild) return
        const id = parseInt(interaction.guild.id)
        
        player[id].pause()
        const song = nowPlaying[id]
        if (!song) {
            interaction.editReply({ content: 'No song to pause' })
            return
        }
        interaction.editReply({ content: `Paused **${song.title}**.` })
    }
}