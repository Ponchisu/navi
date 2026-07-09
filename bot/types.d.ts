import { SlashCommandBuilder, Collection, AutocompleteInteraction } from "discord.js"

declare global {
    var __dirbase: string
}

export interface SlashCommand {
    data: SlashCommandBuilder
    execute: (interaction: GuildedInteraction) => void
    autocomplete?:(interaction: AutocompleteInteraction) => void
    cooldown?: number;
}

declare module "discord.js" {
    export interface Client {
        slashCommand: Collection<string, SlashCommand>
    }
}

export interface BotEvent {
    name: Events,
    once: boolean,
    execute: (...args?) => void
}

export {}