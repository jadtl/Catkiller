import { BaseCommandInteraction, Client } from 'discord.js'
import * as yt from 'youtube-search-without-api-key';

import { Command } from '../../Command'
import { play } from '../functions'

export const Play: Command = {
    name: 'play',
    description: 'Plays the requested song to your voice channel.',
    options: [{ name: 'query', description: 'The keywords for the requested song', type: 'STRING', required: true }],
    type: 'CHAT_INPUT',
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const query = interaction.options.get('query')
        if (!query) return
        
        const result = (await yt.search(`${query.value}`))[0]

        play(client, interaction, { title: result.title, url: result.url, duration: `${result.duration_raw}` })
    }
}