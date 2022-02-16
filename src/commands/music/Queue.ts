import { BaseCommandInteraction, Client } from 'discord.js'

import { Command } from '../../Command'
import { nowPlaying, player, queue } from '../state'

export const Queue: Command = {
    name: 'queue',
    description: 'Displays the songs\' queue.',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        if (!interaction.guild) return
        const id = parseInt(interaction.guild.id)
        
        if (queue[id].isEmpty) {
            interaction.editReply({ content: 'There are no songs in the queue.' })
            return
        }
        const list = queue[id].list()

        interaction.editReply({ content: `**Songs queue**:\n${list.reverse()
            .map(song => `**${list.indexOf(song) + 1}**. ${song.title} \`${song.duration}\`.`)
            .join('\n')}`
        })
    }
}