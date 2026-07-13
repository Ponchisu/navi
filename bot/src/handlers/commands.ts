import { Client, SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../../types";
import { logInfo, logWarning, logConfirm } from "../utils/console";

module.exports = {
    execute: (clint: Client) => {
        logInfo("Loading commands");
        const dirCommands = join(global.__dirbase, "commands");
        readdirSync(dirCommands).forEach((folder) => {
            console.log("> [Module] " + folder);
            readdirSync(join(dirCommands, folder)).filter((file) => file.endsWith('.js')).forEach((file) => {
                let command: SlashCommand = require(join(dirCommands, folder, file)).default;
                if('data' in command && 'execute' in command) {
                    clint.slashCommand.set(command.data.name, command);
                    logConfirm(`The command in ${file} was loaded successfully.`);
                } else {
                    logWarning(`The command at ${file} is missing a required "data" or "execute" property.`);
                }
            })
        });
    }
}