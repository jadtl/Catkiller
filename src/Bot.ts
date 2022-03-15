import { generateDependencyReport } from '@discordjs/voice'
console.log(generateDependencyReport());

import { Client } from 'discord.js'
import 'dotenv/config'

import interactionCreate from './listeners/client/interactionCreate'
import ready from './listeners/client/ready'
import messageCreate from './listeners/client/messageCreate'
import guildCreate from './listeners/client/guildCreate'

const token = process.env.TOKEN
if (!token) throw new Error("TOKEN environment variable missing!")

console.log("Bot is starting...")

const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS', 'GUILD_VOICE_STATES']
});

// Registering client listeners
interactionCreate(client)
messageCreate(client)
guildCreate(client)
ready(client)

client.login(token)