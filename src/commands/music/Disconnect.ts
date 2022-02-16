import * as Discord from '@discordjs/voice'
import { BaseCommandInteraction, Client } from 'discord.js'

import { Command } from '../../Command'
import { timeout } from '../state'

export const Disconnect: Command = {
    name: 'disconnect',
    description: 'Disconnects from the voice channel.',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        if (!interaction.guild) return
        const connection = Discord.getVoiceConnection(interaction.guild.id)
        if (!connection) {
            await interaction.editReply({ content: 'I\'m not connected to a voice channel in this server!' })
            return
        }

        connection.disconnect()
        timeout[parseInt(interaction.guild.id)] = undefined
        await interaction.editReply({ content: 'Disconnected.' })
    }
}