import { Client, Collection, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../types";

const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits

console.log("                   _ ");
console.log(" _ __   __ ___   _(_)");
console.log("| '_ \\ / _` \\ \\ / / |");
console.log("| | | | (_| |\\ V /| |");
console.log("|_| |_|\\__,_| \\_/ |_|\n\n");



const client = new Client({
    intents: [
        Guilds,
        MessageContent,
        GuildMessages,
        GuildMembers,        
    ]
});

if(!process.env.TOKEN || !process.env.CLIENT_ID) {
    throw new Error("`DISCORD_TOKEN` or `CLIENT_ID` not found");
}

client.slashCommand = new Collection<string, SlashCommand>;

global.__dirbase = __dirname;

const dirHandlers = join(__dirname, "handlers");
readdirSync(dirHandlers).forEach((handler) => {
    require(`${dirHandlers}/${handler}`).execute(client);
});


client.login(process.env.TOKEN);
