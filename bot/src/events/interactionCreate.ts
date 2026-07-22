import { Events, Interaction, MessageFlags } from "discord.js";
import { logError, logExcecute } from "../utils/console";


const event = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction: Interaction) => {
        if(!interaction.isChatInputCommand()) return;

        // if(!interaction.guild) return;

        const command = interaction.client.slashCommand.get(interaction.commandName);
        const cooldown = interaction.client.cooldown.get(`${command?.data.name}-${interaction.user.id}`)

        if(!command) {
            logError(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        if(command.cooldown && cooldown) {
            if(Date.now() < cooldown) {
                if(command.cooldownMessage) {
                    return command.cooldownMessage(interaction, Math.round((cooldown - Date.now()) / 1000));
                } else {
                    return interaction.reply({
                        content: `Esperá \`${Math.round((cooldown - Date.now()) / 1000)} segundos\` antes de volver a usar este comando.`
                    });
                }
            }
            interaction.client.cooldown.set(`${command?.data.name}-${interaction.user.id}`, Date.now() + command.cooldown * 1000);
            setTimeout(() => interaction.client.cooldown.delete(`${command?.data.name}-${interaction.user.id}`), command.cooldown * 1000);
        } else if(command.cooldown && !cooldown) {
            interaction.client.cooldown.set(`${command?.data.name}-${interaction.user.id}`, Date.now() + command.cooldown * 1000);
            setTimeout(() => interaction.client.cooldown.delete(`${command?.data.name}-${interaction.user.id}`), command.cooldown * 1000);
        }

        try {
            logExcecute(command.data.name);
            await command?.execute(interaction);
        } catch(error) {
            if(error instanceof Error) {
                logError(error.message);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    flags: MessageFlags.Ephemeral,
                });
            }
        }
    }
}

export default event;