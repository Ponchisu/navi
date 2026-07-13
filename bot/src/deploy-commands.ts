import { readdirSync } from "fs";
import { join } from "path";
import { logWarning, logConfirm } from "./utils/console";
import { REST, Routes, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { SlashCommand } from "../types";

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const command: SlashCommand = require(filePath).default;
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
			logConfirm(`The command in ${file} was loaded successfully.`);
		} else {
			logWarning(`The command at ${file} is missing a required "data" or "execute" property.`);
		}
	}
}


if(!process.env.TOKEN) {
    throw new Error("`DISCORD_TOKEN` not found");
}
const rest = new REST().setToken(process.env.TOKEN);

(async () => {
	
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		if(!process.env.CLIENT_ID) {
			throw new Error("`CLIENT_ID` not found");
		}
		const data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands }) as RESTPostAPIChatInputApplicationCommandsJSONBody [];

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();