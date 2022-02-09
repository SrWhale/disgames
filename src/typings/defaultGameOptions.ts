import { User, MessageInteraction } from 'discord.js';

interface defaultGameOptions {
    name: string;
    description: string,
    user: User,
    size: number,
    board: Array<Array<string | number>>,
    interaction: MessageInteraction

}

export default defaultGameOptions;