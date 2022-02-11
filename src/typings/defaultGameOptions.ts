import { User, CommandInteraction } from 'discord.js';

interface defaultGameOptions {
    user?: User,
    size: number,
    board?: Array<Array<string | number>>,
    interaction: CommandInteraction

}

export default defaultGameOptions;