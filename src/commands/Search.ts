import { Base, BaseCommandInteraction, Client, MessageActionRow, MessageButton } from 'discord.js'
import ytdl from 'ytdl-core'
import * as Discord from '@discordjs/voice'
import * as yt from 'youtube-search-without-api-key';

import { reply, error, Command } from '../Command'

export const Search: Command = {
    name: 'search',
    description: 'Searches songs using the given keywords',
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

        const results = (await yt.search(`${query.value}`)).slice(0, 5)
        
        await interaction.followUp({ 
            content: results
                .map((result) => `**${results.indexOf(result) + 1}**. ${result.title} \`${result.duration_raw}\``)
                .join('\n'),
            components: [new MessageActionRow()
                .addComponents(results.map((result) => new MessageButton()
                    .setCustomId(`${results.indexOf(result)}`)
                    .setLabel(`${results.indexOf(result) + 1}`)
                    .setStyle('PRIMARY')))]
        })

        const filter = (i: { user: { id: string } }) => {
            return interaction.user.id == i.user.id
        }

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 })

        collector.on('collect', async i => {
            if (!i.isButton()) return;

            const result = results[parseInt(i.customId)]

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

            i.update({content: `Now playing **${result.title}**`, components: []})
        })
    }
}