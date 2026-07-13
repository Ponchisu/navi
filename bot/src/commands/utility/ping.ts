import { SlashCommand } from "../../../types";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Hacer un ping al bot"),
    execute: async (interaction) => {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Pong🏓\nPing⌛️:\`${interaction.client.ws.ping}ms\``)
                    .setColor('#13425e')
            ]
        });
    }
}

export default command;