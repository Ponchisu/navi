import { Client, Events} from "discord.js";
import { logConecting } from "../utils/console";

const event = {
    name: Events.ClientReady,
    once: true,
    execute: async (client: Client) => {
        if(!client.user) return;

	    client.user?.setActivity("Navi beta v0.1");
        logConecting(client.user.tag);
    }
};


export default event;