import { Events, Interaction, MessageFlags } from "discord.js";
import { logError } from "../utils/console";


const event = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction: Interaction) => {
        if(!interaction.isChatInputCommand()) return;
        const command = interaction.client.slashCommand.get(interaction.commandName);

        if(!command) {
            logError(`No command matching ${interaction.commandName} was found.`);
        }

        try {
            await command?.execute(interaction);
        } catch(errorç) {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    flags: MessageFlags.Ephemeral,
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    flags: MessageFlags.Ephemeral,
                });
            }
        }
    }
}

export default event;