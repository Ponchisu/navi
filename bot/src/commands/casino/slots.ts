import { SlashCommand } from "../../../types";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

const arrow_empty: string = "<:arrow_empty:1528143228547891251>";
const arrow_right: string = "<:arrow_right:1528148508312469694>";
const arrow_left: string = "<:arrow_left:1528147854109970524>";
const arrow_up: string = "<:arrow_up:1528147850549137408>";
const arrow_down: string = "<:arrow_down:1528145210519982201>";
const arrow_lower_left: string = "<:arrow_lower_left:1528147855569715405>";
const arrow_upper_left: string = "<:arrow_upper_left:1528147852084121620>";
const arrow_upper_right: string = "<:arrow_upper_right:1528147849165017201>";
const arrow_lower_right: string = "<:arrow_lower_right:1528144828011909260>";


function randomFruit(): string {
    const fruit: string[] = ["🍇", "🍈", "🍉", "🍊", "🍋", "🍋‍🟩", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐"];
    return fruit[Math.floor(Math.random() * fruit.length)]!;
}

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('slots')
        .setDescription('Apostar una tirada')
        .addIntegerOption(option => 
            option.setName('coins')
                .setDescription('Cantidad de monedas a apostar')
                .setRequired(true)
                .addChoices(
                    { name: '10', value: 10 },
                    { name: '20', value: 20 },
                    { name: '50', value: 50 },
                    { name: '100', value: 100 }
                )
        ),
    execute: async (interaction) => {
        const slots: string[][] = [
            [randomFruit(), randomFruit(), randomFruit()],
            [randomFruit(), randomFruit(), randomFruit()],
            [randomFruit(), randomFruit(), randomFruit()]
        ];

        const coins: number = interaction.options.getInteger('coins', true);
        let mult: number = 0;

        const row1: boolean = slots[0]![0]! === slots[0]![1]! && slots[0]![0]! == slots[0]![2]!;
        mult += row1 ? 1 : 0;
        const row2: boolean = slots[1]![0]! === slots[1]![1]! && slots[1]![0]! == slots[1]![2]!;
        mult += row2 ? 1 : 0;
        const row3: boolean = slots[2]![0]! === slots[2]![1]! && slots[2]![0]! == slots[2]![2]!;
        mult += row3 ? 1 : 0;
        const column1: boolean = slots[0]![0]! === slots[1]![0]! && slots[0]![0]! == slots[2]![0]!;
        mult += column1 ? 1 : 0;
        const column2: boolean = slots[0]![1]! === slots[1]![1]! && slots[0]![1]! == slots[2]![1]!;
        mult += column2 ? 1 : 0;
        const column3: boolean = slots[0]![2]! === slots[1]![2]! && slots[0]![2]! == slots[2]![2]!;
        mult += column3 ? 1 : 0;
        const mainDiagonal: boolean = slots[0]![0]! === slots[1]![1]! && slots[0]![0]! == slots[2]![2]!;
        mult += mainDiagonal ? 1 : 0;
        const secondaryDiagonal: boolean = slots[0]![2]! === slots[1]![1]! && slots[0]![2]! == slots[2]![0]!;
        mult += secondaryDiagonal ? 1 : 0;

        const winer: boolean = row1 || row2 || row3 || column1 || column2 || column3 || mainDiagonal || secondaryDiagonal;
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: interaction.member.displayName, 
                        iconURL: interaction.member.displayAvatarURL()
                    })
                    .setDescription(
                        (mainDiagonal ? arrow_lower_right : arrow_empty) +
                        (column1 ? arrow_down : arrow_empty) +
                        (column2 ? arrow_down : arrow_empty) +
                        (column3 ? arrow_down : arrow_empty) +
                        (secondaryDiagonal ? arrow_lower_left : arrow_empty) +
                        "\n" +
                        slots.map((fila, index = 0) =>  {
                        index ++;
                        return (index == 1 ? row1 ? arrow_right : arrow_empty :
                            index == 2 ? row2 ? arrow_right : arrow_empty :
                            row3 ? arrow_right : arrow_empty)
                            + fila.join("") + 
                            (index == 1 ? row1 ? arrow_left : arrow_empty :
                            index == 2 ? row2 ? arrow_left : arrow_empty :
                            row3 ? arrow_left : arrow_empty);
                        }).join("\n") +
                        "\n" +
                        (secondaryDiagonal ? arrow_upper_right : arrow_empty) +
                        (column1 ? arrow_up : arrow_empty) +
                        (column2 ? arrow_up : arrow_empty) +
                        (column3 ? arrow_up : arrow_empty) +
                        (mainDiagonal ? arrow_upper_left : arrow_empty)
                    )
                    .setColor(winer ? 15793986 : 12143435)
                    .addFields({ 
                        name: winer ? "¡Ganaste papu!" : "Perdiste papu",
                        value: winer ? `Has ganado **+${Math.floor(coins * (1 + 0.25 * mult))}**` : `Has perdido **-${coins}**`, 
                        inline: true 
                    })
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