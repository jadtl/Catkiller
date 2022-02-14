import { BaseCommandInteraction, Client } from 'discord.js'
import ytdl from 'ytdl-core'
import * as Discord from '@discordjs/voice'
import * as yt from 'youtube-search-without-api-key';

import { reply as reply, error, Command } from '../Command'

export const Play: Command = {
    name: 'play',
    description: 'Plays the requested song to your voice channel',
    options: [{ name: 'query', description: 'The keywords for the requested song', type: 'STRING', required: true }],
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const query = interaction.options.get('query')
        
        if (!query) {
            error(interaction, 'invalid query')
            return
        }

        if (!interaction.member) {
            error(interaction, 'member is null')
            return
        }

        if (!interaction.channel) {
            reply(interaction, 'Connect to a voice channel first!')
            return
        }

        if (!interaction.guild) {
            reply(interaction, 'This command must be sent from a server!')
            return
        }
        const guild = client.guilds.cache.get(interaction.guild.id)
        if (!guild) {
            error(interaction, 'guild is null')
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

        const result = (await yt.search(`${query.value}`))[0]

        const stream = ytdl(result.url, { filter: 'audioonly' })

        const player = Discord.createAudioPlayer()
        const resource = Discord.createAudioResource(stream)

        const connection = Discord.joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator
        })

        player.play(resource)
        player.on('error', error => {
            console.error(`Error: ${error.message}`);
        });
        connection.subscribe(player)

        player.on(Discord.AudioPlayerStatus.Idle, () => {
            connection.destroy()
        })

        interaction.followUp({content: `Now playing **${result.title}**`})
    }
}