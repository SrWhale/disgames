import { CommandInteraction, User } from 'discord.js';

import defaultGameOptions from '../typings/defaultGameOptions';

export default class gameStructure {
    user?: User;
    size: number;
    interaction: CommandInteraction

    constructor(options: defaultGameOptions) {

        this.interaction = options.interaction;

        if (options.user) this.user = options.user;

        this.size = options.size;
    }
}