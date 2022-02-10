import { CommandInteraction, User } from 'discord.js';

import defaultGameOptions from '../typings/defaultGameOptions';

export default class gameStructure {
    user: User;
    size: number;
    board: Array<Array<string | number>>;
    interaction: CommandInteraction

    constructor(options: defaultGameOptions) {

        this.interaction = options.interaction;

        this.user = options.user

        this.size = options.size

        this.board = options.board;
    }
}