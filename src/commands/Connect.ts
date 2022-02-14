import { BaseCommandInteraction, Client } from 'discord.js'
import { joinVoiceChannel } from '@discordjs/voice'

import { reply as reply, error, Command } from '../Command'

export const Connect: Command = {
    name: 'connect',
    description: 'Connects to your voice channel',
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        if (!interaction.guild) {
            reply(interaction, 'This command must be sent from a server!')
            return
        }
        const guild = client.guilds.cache.get(interaction.guild.id)
        if (!guild) {
            error(interaction, 'guild is null')
            return
        }

        if (!interaction.member) {
            reply(interaction, 'This command must be sent by a member!')
            return
        }
        const member = guild.members.cache.get(interaction.member.user.id)
        if (!member) {
            error(interaction, 'member is null')
            return
        }

        const channel = member.voice.channel
        if (!channel) {
            error(interaction, 'can\'t find voice channel')
            return
        }
        
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator
        })
        
        reply(interaction, `Connected to voice channel **${channel.name}**`)
    }
}