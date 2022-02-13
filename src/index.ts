import games from './games';

export default {
    games
};

import { Client, CommandInteraction, GuildMember, Intents, Interaction } from "discord.js";

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_BANS',
        'GUILD_INTEGRATIONS',
        'GUILD_WEBHOOKS',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGE_TYPING',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS',
        'DIRECT_MESSAGE_TYPING',
    ]
});

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';

const commands = [
    {
        name: '2048',
        description: 'Replies with Pong!',
    },
    {
        name: 'tictactoe',
        description: "Play tictactoe!",
        options: [{
            name: 'member',
            type: ApplicationCommandOptionTypes.USER,
            required: true,
            description: "Member to challenge"
        }]
    }
];

const rest = new REST({ version: '9' }).setToken('NjQxNDExNDU1MDk0MjI2OTcw.XcH-9w.5kZQ60yQbcoxA2vrY7_gEeCLVBY');

client.login('NjQxNDExNDU1MDk0MjI2OTcw.XcH-9w.5kZQ60yQbcoxA2vrY7_gEeCLVBY');

client.on('ready', async () => {
    console.log('BOT ONLINE');
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(client.user!.id, '657008822912679936'), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async (interaction) => {

    if (interaction.isCommand()) {
        if ((interaction as CommandInteraction).commandName === '2048') {
            console.log('a')
            new games.Two({
                interaction: interaction as CommandInteraction,
                size: 4
            }).play()
        };

        if ((interaction as CommandInteraction).commandName === 'tictactoe') {
            new games.Tic({
                interaction: interaction as CommandInteraction,
                member: interaction.options.getMember('member') as GuildMember
            }).play()
        }
    }
})