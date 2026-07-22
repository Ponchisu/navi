import { SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, Collection, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js"

declare global {
    var __dirbase: string
}

export interface SlashCommand {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder,
    execute: (interaction: ChatInputCommandInteraction<CacheType>) => void,
    // autocomplete?:(interaction: AutocompleteInteraction) => void,
    cooldown?: number,
    cooldownMessage?: (interaction: ChatInputCommandInteraction<CacheType>, time: number) => Promise<InteractionResponse<boolean>>
}

declare module "discord.js" {
    export interface Client {
        slashCommand: Collection<string, SlashCommand>,
        cooldown: Collection<string, number>
    }
}

export interface BotEvent {
    name: Events,
    once: boolean,
    execute: (...args?) => void
}

export {}