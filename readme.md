## About

[Disgames](https://github.com/SrWhale/disgames) is a powerful [Node.js](https://nodejs.org) module that allows you to easily play games in the discord using [Discord.js](https://github.com/discordjs/discord.js) module.
Using the [Discord API](https://discord.com/developers/docs/intro).

## Installation

**Node.js 16.9.0 or newer is required.**

```sh-session
npm install disgames
yarn add disgames
pnpm add disgames
```

## Easily example usage (model used for all games)

```js
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const { Two, TicTacToe } = require('disgames');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === '2048') {
		new Two({
            interaction,
            size: 4
        }).play()
	}

    if(interaction.commandName === 'tictactoe') {
        new TicTacToe({
            interaction,
            member: interaction.options.getMember('member_option_name')
        })
    };

    // Use this model to run all games
});

client.login('token');
```

## Links

- [Discord API Discord server](https://discord.gg/discord-api)
- [GitHub](https://github.com/discordjs/discord.js)
- [npm](https://www.npmjs.com/package/disgames)