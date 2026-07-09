import { SlashCommand } from "../../../types";
import {SlashCommandBuilder} from "discord.js"


const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Hacer un ping al bot"),
    execute: async (interation) => {
        interation.reply('Pong 🏓');
    }
}

export default command;