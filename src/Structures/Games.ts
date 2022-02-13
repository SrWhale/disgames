import { Client, CommandInteraction, GuildMember, Message } from 'discord.js';

import { Bot } from 'aoi.js';

import defaultGameOptions from '../typings/defaultGameOptions';

export default class gameStructure {
    member?: GuildMember;
    size?: number;
    interaction: CommandInteraction;
    message?: Message

    constructor(options: defaultGameOptions) {

        this.interaction = options.interaction;

        if (options.member) this.member = options.member;

        this.size = options.size;
    }
}