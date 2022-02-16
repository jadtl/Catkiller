import { BaseCommandInteraction, Client } from 'discord.js'

import { Command } from '../../Command'
import { connect } from '../functions'

export const Connect: Command = {
    name: 'connect',
    description: 'Connects to your voice channel.',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const state = connect(client, interaction)

        if (state)
            interaction.editReply({ content: `Connected to voice channel **${state.channel.name}**.` })
    }
}