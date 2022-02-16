import { BaseCommandInteraction, Client, Message, MessageActionRow, MessageButton } from 'discord.js'
import * as yt from 'youtube-search-without-api-key';

import { Command } from '../../Command'
import { connect, play } from '../functions'

export const Search: Command = {
    name: 'search',
    description: 'Searches songs using the given keywords.',
    options: [{ name: 'query', description: 'The keywords for the requested song.', type: 'STRING', required: true }],
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const query = interaction.options.get('query')
        if (!query) return

        const state = connect(client, interaction)
        if (!state) return

        const results = (await yt.search(`${query.value}`)).slice(0, 5)
        
        await interaction.editReply({ 
            content: results
                .map((result) => `**${results.indexOf(result) + 1}**. ${result.title} \`${result.duration_raw}\`.`)
                .join('\n'),
            components: [ 
                new MessageActionRow().addComponents(results.map((result) => new MessageButton()
                    .setCustomId(`${results.indexOf(result)}`)
                    .setLabel(`${results.indexOf(result) + 1}`)
                    .setStyle('PRIMARY'))),
                new MessageActionRow().addComponents(new MessageButton()
                    .setCustomId('cancel')
                    .setLabel('X')
                    .setStyle('DANGER')) 
            ]
        })
        const filter = (i: { user: { id: string } }) => {
            return interaction.user.id == i.user.id
        }
        if (!interaction.channel) return
        
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 })
        collector.on('collect', async i => {
            if (!i.isButton()) return
            if (i.customId == 'cancel') {
                await interaction.editReply({ content: 'Search aborted.', components: [] })
            } else {
                const result = results[parseInt(i.customId)]
                play(client, interaction, { title: result.title, url: result.url, duration: `${result.duration_raw}` })
            }
        })
    }
}