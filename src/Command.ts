import { BaseCommandInteraction, ChatInputApplicationCommandData, Client } from 'discord.js'

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction) => void
}

export async function reply(interaction: BaseCommandInteraction, message: string) {
    const content = message
    await interaction.followUp({
        ephemeral: true,
        content
    })
}

export async function error(interaction: BaseCommandInteraction, reason: string) {
    const content = `An error occured! (${reason})`
    await interaction.followUp({
        ephemeral: true,
        content
    })
}