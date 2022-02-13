import { Collection, GuildMember, MessageButton, MessageActionRow, Message } from "discord.js";
import { MessageButtonStyles } from "discord.js/typings/enums";

import gameStructure from "../Structures/Games";

import defaultGameOptions from "../typings/defaultGameOptions";

interface playersObject {
    player: GuildMember,
    type: string
}

interface styles {
    'x': {
        content: string,
        style: number
    },
    '❌': {
        content: string,
        style: number
    },
    '⭕': {
        content: string,
        style: number
    }
}
export default class Tic extends gameStructure {

    name: string;

    description: string;

    players: Array<playersObject>;

    jogadas: number;

    atual: playersObject;

    status: Array<object>;

    styles: styles

    board: Array<string>;

    buttons: Array<MessageButton>
    constructor(options: defaultGameOptions) {
        super(options);

        this.name = "Tic Tac Toe";

        this.description = "Play tictactoe!";

        const shuffle = new Collection<string, GuildMember>()
            .set(this.interaction.member!.user.id as string, this.interaction.member as GuildMember)
            .set(this.member!.id as string, this.member as GuildMember)

        const user1 = shuffle.random();

        const user2 = shuffle.find(member => member.id !== user1!.id)

        this.board = Array(9).fill('x');

        this.players = [{
            player: user1 as GuildMember,
            type: '❌'
        }, {
            player: user2 as GuildMember,
            type: '⭕'
        }];

        this.jogadas = 0;

        this.atual = {
            player: user1 as GuildMember,
            type: '❌'
        }

        this.status = [{
            player: this.interaction.member,
        }, {
            player: this.member
        }];

        this.styles = {
            'x': {
                content: ' ',
                style: MessageButtonStyles.SECONDARY
            },
            '❌': {
                content: '❌',
                style: MessageButtonStyles.SUCCESS
            },
            '⭕': {
                content: '⭕',
                style: MessageButtonStyles.DANGER
            }
        };

        this.buttons = Array(9).fill(true).map((_, indice) => new MessageButton().setStyle(MessageButtonStyles.PRIMARY).setLabel(' ').setCustomId(`${indice}`));
    }

    async play() {
        const buttons = Array(9).fill(true).map((_, indice) => new MessageButton().setStyle(MessageButtonStyles.PRIMARY).setLabel(' ').setCustomId(`${indice}`));

        const message = await this.interaction.reply({
            content: `Está na vez de ${this.atual.player}`,
            components: this.handleButtons(),
            fetchReply: true
        }) as Message;

        const collector = message.createMessageComponentCollector({
            filter: (Interaction) => Interaction.isButton() && Interaction.user.id === this.atual.player.id
        })

            .on('collect', button => {
                button.deferUpdate();

                this.jogadas++;

                this.buttons[Number(button.customId)] = new MessageButton()
                    .setStyle((this.styles as any)[this.atual.type].style)
                    .setEmoji((this.styles as any)[this.atual.type].content)
                    .setCustomId(button.customId);

                if (this.jogadas > 4) {
                    const check = this.checkWin();

                    if (!check && this.jogadas >= 9) {
                        message.edit({
                            content: `A partida empatou!`,
                            components: this.handleButtons()
                        })

                        collector.stop('limit');

                        return;
                    }

                    if (check) {
                        message.edit({
                            content: `${this.atual.player} ganhou!`,
                            components: this.handleButtons()
                        })

                        collector.stop('limit');

                        return;
                    }

                    this.atual = this.atual.type === '❌' ? this.players[1] : this.players[0];

                    message.edit({
                        content: `Está na vez de ${this.atual.player}`,
                        components: this.handleButtons()
                    })

                } else {
                    this.atual = this.atual.type === '❌' ? this.players[1] : this.players[0];

                    message.edit({
                        content: `Está na vez de ${this.atual.player}`,
                        components: this.handleButtons()
                    })
                }
            })
    }

    handleButtons() {
        const b = Array<MessageActionRow>();

        for (let i = 0, j = 0; i < 9; i += 3, j++) {
            b[j] = new MessageActionRow()

            b[j].addComponents(this.buttons.slice(i, i + 3));
        };

        return b
    }

    checkWin() {
        let winStates = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winStates.length; i++) {
            const sequence = winStates[i];

            const
                pos1 = sequence[0],
                pos2 = sequence[1],
                pos3 = sequence[2];

            if (this.board[pos1] !== 'x' && this.board[sequence[0]] == this.board[sequence[1]] && this.board[sequence[0]] == this.board[sequence[2]] && this.board[sequence[1]] == this.board[sequence[2]]) {

                return {
                    index: i,
                    winner: this.board[pos1]
                }
            }

            else continue;
        }

        return false
    }
}