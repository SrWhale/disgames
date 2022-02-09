import { MessageInteraction, User } from 'discord.js';

import defaultGameOptions from '../typings/defaultGameOptions';

export default class gameStructure {
    name: string;
    description: string;
    user: User;
    size: number;
    board: Array<Array<string | number>>;
    interaction: MessageInteraction

    constructor(options: defaultGameOptions) {
        this.name = options.name;

        this.description = options.description

        this.interaction = options.interaction;

        this.user = options.user

        this.size = options.size

        this.board = options.board;
    }
}