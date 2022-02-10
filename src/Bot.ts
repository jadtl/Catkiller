import { Client, ClientOptions } from 'discord.js'
import 'dotenv/config'

import ready from './listeners/ready'
import interactionCreate from './listeners/interactionCreate'

const token = process.env.BOT_TOKEN
console.log(token)
console.log("Bot is starting...")

const client = new Client({
    intents: []
});

ready(client)
interactionCreate(client)

client.login(token)

console.log(client)