import { Client, Message } from 'discord.js'

export default (client: Client): void => {
    client.on('messageCreate', async (message: Message) => {
        if (message.author.bot) return

        //prequel easter egg
        if (message.content.toLowerCase() == 'hello there!') {
            await message.channel.send('General Kenobi!')
        }
    })
}