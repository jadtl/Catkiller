import { BaseCommandInteraction, Client } from 'discord.js'

import { Command } from '../Command'

export const Test: Command = {
    name: 'test',
    description: 'Test command',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = 'General Kenobi!'

        await interaction.followUp({
            ephemeral: true,
            content
        })
    }
}