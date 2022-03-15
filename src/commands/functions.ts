import { Client, BaseCommandInteraction, VoiceBasedChannel } from 'discord.js'
import ytdl from 'ytdl-core'
import * as Discord from '@discordjs/voice'

import { nowPlaying, player, queue } from './state';

export function connect(client: Client, interaction: BaseCommandInteraction): { channel: VoiceBasedChannel; connection: Discord.VoiceConnection } | undefined  {
    if (!interaction.member) {
        interaction.editReply({ content: 'This command can only be used inside a server!' })
        return
    }

    if (!interaction.guild) return
    const guild = client.guilds.cache.get(interaction.guild.id)
    if (!guild) return

    const member = guild.members.cache.get(interaction.member.user.id)
    if (!member) return

    const channel = member.voice.channel
    if (!channel) {
        interaction.editReply({ content: 'This command can only be used when connected to a voice channel!' })
        return
    }

    const id = parseInt(guild.id)

    const connection = Discord.joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator
    })
    connection.on(Discord.VoiceConnectionStatus.Destroyed, () => {
        player[id].pause()
    })
    connection.subscribe(player[id])

    return { channel: channel, connection: connection }
}

export async function play(client: Client, interaction: BaseCommandInteraction, result: { title: string, url: string, duration: string }): Promise<void> {
    if (!interaction.guild) return
    const id = parseInt(interaction.guild.id)
    const connection = Discord.getVoiceConnection(interaction.guild.id)

    if (!connection) {
        const state = connect(client, interaction)
        if (!state) return
        state.connection.subscribe(player[id])
    }

    if (queue[id].isEmpty && !nowPlaying[id]) {
        const stream = ytdl(result.url, { filter: 'audioonly', quality: 'highest', highWaterMark: 1 << 25 })
        const resource = Discord.createAudioResource(stream)
        player[id].play(resource)
        nowPlaying[id] = result
        
        interaction.editReply({ content: `Now playing **${result.title}** \`${result.duration}\`.`, components: [] }) 
    } else {
        queue[id].enqueue(result)

        interaction.editReply({ content: `Queued **${result.title}** \`${result.duration}\`.`, components: [] }) 
    }
}