import { Client } from "discord.js";
import { logInfo, logConfirm } from "../utils/console";
import { join } from "path";
import { readdirSync } from "fs";
import { BotEvent } from "../../types";



module.exports = {
    execute: (client: Client) => {
        logInfo("Loading events");
        const dirEvents = join(global.__dirbase, "events");
        readdirSync(dirEvents).filter((file) => file.endsWith('.js')).forEach((file) => {
            let event: BotEvent = require(join(dirEvents, file)).default;
            if(event.once == true) { 
                client.once(event.name, (...args) => event.execute(...args)) 
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
            logConfirm(`The event in ${file} was loaded successfully.`);
        })
    }
}