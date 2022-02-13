import { CommandInteraction, Client, GuildMember, Message } from 'discord.js';

import { Bot } from "aoi.js";

interface defaultGameOptions {
    member?: GuildMember,
    size?: number,
    board?: Array<Array<string | number>> | Array<string | number>,
    interaction: CommandInteraction,
}

export default defaultGameOptions;