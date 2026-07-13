import { SlashCommand } from "../../../types";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"


function randomFruit(): string {
    const fruit: string[] = ["🍇", "🍈", "🍉", "🍊", "🍋", "🍋‍🟩", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐"];
    return fruit[Math.floor(Math.random() * fruit.length)]!;
}

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('gambling')
        .setDescription('Apostar una tirada'),
    execute: async (interaction) => {

        let timba: string[] = [
            randomFruit(), 
            randomFruit(), 
            randomFruit()
        ];

        let ganador: boolean = timba[0] == timba[1] && timba[0] == timba[2];
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(ganador ? `Timba sale bien:` : `Timba sale mal:`)
                    .setDescription(timba.join(""))
                    .setColor(ganador ? 15793986 : 12143435)
                    .setFooter({text: ganador ? "Ganaste papu" : "Perdiste papu"})
            ],
        });
    },
    cooldown: 5,
    cooldownMessage(interaction, time) {
        return interaction.reply({
            content: `Despacio ludopata, espera \`${time} segundos\` antes de volver a timbear.`
        });
    },
}

export default command