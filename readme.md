## About

disgames is a powerful [Node.js](https://nodejs.org) module that allows you to easily play games in the discord using [Discord.js](https://github.com/discordjs/discord.js) module.
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
            user: interaction.options.getMember('member_option_name')
        })
    };

    // Use this model to run all games
});

client.login('token');
```

## Links

- [Website](https://discord.js.org/) ([source](https://github.com/discordjs/website))
- [Documentation](https://discord.js.org/#/docs)
- [Guide](https://discordjs.guide/) ([source](https://github.com/discordjs/guide))
  See also the [Update Guide](https://discordjs.guide/additional-info/changes-in-v13.html), including updated and removed items in the library.
- [discord.js Discord server](https://discord.gg/djs)
- [Discord API Discord server](https://discord.gg/discord-api)
- [GitHub](https://github.com/discordjs/discord.js)
- [npm](https://www.npmjs.com/package/discord.js)
- [Related libraries](https://discord.com/developers/docs/topics/community-resources#libraries)

### Extensions

- [RPC](https://www.npmjs.com/package/discord-rpc) ([source](https://github.com/discordjs/RPC))

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the
[documentation](https://discord.js.org/#/docs).  
See [the contribution guide](https://github.com/discordjs/discord.js/blob/main/.github/CONTRIBUTING.md) if you'd like to submit a PR.

## Help

If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle
nudge in the right direction, please don't hesitate to join our official [discord.js Server](https://discord.gg/djs).
