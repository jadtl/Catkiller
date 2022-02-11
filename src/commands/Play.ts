import { BaseCommandInteraction, Client } from 'discord.js'
import '@discordjs/voice'

import { reply as reply, error, Command } from '../Command'
import { joinVoiceChannel } from '@discordjs/voice'

export const Play: Command = {
    name: 'play',
    description: 'Plays the requested song to your voice channel',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        reply(interaction, 'Not yet implemented')
    }
}