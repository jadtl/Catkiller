import { BaseCommandInteraction, Client } from 'discord.js'

import { Command } from '../../Command'
import { nowPlaying } from '../state'

export const NowPlaying: Command = {
    name: 'nowplaying',
    description: 'Tells what song is currently playing.',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        if (!interaction.guild) return
        const id = parseInt(interaction.guild.id)

        const result = nowPlaying[id]
        if (!result) {
            interaction.editReply({ content: `No song is currently playing.` })
        } else {
            interaction.editReply({ content: `Now playing:\n **${result.title}** \`${result.duration}\`.` })
        }
    }
}