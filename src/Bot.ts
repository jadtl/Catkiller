import { Client, ClientOptions } from 'discord.js'
import 'dotenv/config'

import interactionCreate from './listeners/interactionCreate'
import ready from './listeners/ready'
import messageCreate from './listeners/messageCreate'

const token = process.env.BOT_TOKEN
if (!token) throw new Error("BOT_TOKEN environment variable missing!")

console.log("Bot is starting...")

const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS']
});

ready(client)
interactionCreate(client)
messageCreate(client)

client.login(token)

console.log(client)