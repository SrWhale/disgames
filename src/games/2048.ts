import gameStructure from "../Structures/Games"

import defaultGameOptions from "../typings/defaultGameOptions";

import { Message, MessageButton, MessageActionRow, ButtonInteraction } from 'discord.js';

import { Bot } from 'aoi.js';

import { MessageButtonStyles } from "discord.js/typings/enums";

const emojis: Array<string> = [
    '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣',
    '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣',
];

interface pieceObject {
    x: number,
    y: number
};

interface emojiObject {
    value: number,
    name: string,
    id: string
}

interface TwoInterface {
    size: number
}

export default class Two extends gameStructure{

    name: string;
    description: string;

    emojis: Array<emojiObject>;

    board: Array<Array<number>>
    constructor(options: defaultGameOptions) {
        super(options);

        this.name = "2048";
        this.description = "Play 2048!";

        this.board = [];

        this.board[(this.size as number)] = [];

        for (let i = 0; i < (this.size as number); i++) {
            this.board[i] = [];

            for (let j = 0; j < (this.size as number); j++) {
                this.board[i][j] = 0;
            }
        }

        this.emojis = [
            {
                value: 0,
                name: '<:0_:788096542027284500>',
                id: '788096542027284500'
            },
            {
                value: 2,
                name: '<:2_:788095109043454012>',
                id: '788095109043454012'
            },
            {
                value: 4,
                name: '<:4_:788095124911030303>',
                id: '788095124911030303'
            },
            {
                value: 8,
                name: '<:8_:788095156607123486>',
                id: '788095156607123486'
            },
            {
                value: 16,
                name: '<:16:788095156632420363>',
                id: '788095156632420363'
            },
            {
                value: 32,
                name: '<:32:788095156611186728>',
                id: '788095156611186728'
            },
            {
                value: 64,
                name: '<:64:788095156750516224>',
                id: '788095156750516224'
            },
            {
                value: 128,
                name: '<:128:788095156754317372>',
                id: '788095156754317372'
            }, {
                value: 256,
                name: '<:256:788448342585376779>',
                id: '788448342585376779'
            }, {
                value: 512,
                name: '<:512:788448342622601216>',
                id: '788448342622601216'
            }, {
                value: 1024,
                name: '<:1024:788448342447095848>',
                id: '788448342447095848'
            }, {
                value: 2048,
                name: '<:2048:788448342328999957>',
                id: '788448342328999957'
            }, {
                value: 4096,
                name: '<:4096:788448342366617621>',
                id: '788448342366617621'
            }, {
                value: 8192,
                name: '<:8192:788448342173941821>',
                id: '788448342173941821'
            }]
    }

    async play() {

        const directions = [{
            button: new MessageButton().setStyle(MessageButtonStyles.SECONDARY).setCustomId('⬅️').setEmoji('⬅️'),
            name: 'left'
        }, {
            button: new MessageButton().setStyle(MessageButtonStyles.SECONDARY).setCustomId('➡️').setEmoji('➡️'),
            name: 'right'
        }, {
            button: new MessageButton().setStyle(MessageButtonStyles.SECONDARY).setCustomId('⬆️').setEmoji('⬆️'),
            name: 'up'
        }, {
            button: new MessageButton().setStyle(MessageButtonStyles.SECONDARY).setCustomId('⬇️').setEmoji('⬇️'),
            name: 'down'
        }];

        this.addCard();

        const message = await this.interaction.reply({
            content: this.handleMessage(this.board),
            fetchReply: true,
            components: [new MessageActionRow().addComponents(directions.map(direction => direction.button))]
        }) as Message;

        const collector = message.createMessageComponentCollector({
            filter: (interaction) => interaction.isButton() && interaction.user.id === this.interaction.user.id
        })

            .on('collect', async (button: ButtonInteraction) => {
                button.deferUpdate()

                const usedPosition = directions.find(d => d.button.customId === button.customId)?.name;

                switch (usedPosition) {
                    case 'right':
                        this.move(false, false, true, false);
                        break;
                    case 'left':
                        this.move(false, false, false, true);
                        break;
                    case 'down':
                        this.move(false, true, false, false);
                        break
                    case 'up':
                        this.move(true, false, false, false)
                        break;
                };

                if (this.checkEnd()) {
                    collector.stop();

                    let pontuação = 0;

                    this.board.forEach(e => e.filter(i => i !== 2).map(i => pontuação += this.emojis.find(e => e.value === i)!.value));

                    message.edit({
                        content: 'Jogo finalizado! Sua pontuação: ' + pontuação.toString().split("").map(i => emojis[Number(i) as number]).join(''),
                        components: []
                    })

                } else {

                    this.addCard();

                    this.interaction.editReply({
                        content: this.handleMessage(this.board)
                    })
                }
            })
    }

    async move(up = false, down = false, right = false, left = false) {
        let history: Array<pieceObject> = [];

        let iPlus = (down ? -1 : +1), jPlus = (right ? -1 : +1);
        let xPlus = (up || down ? (up ? -1 : +1) : 0), yPlus = (right || left ? (left ? -1 : +1) : 0);
        let iStarts = (up || down ? (up ? 1 : (this.size as number) - 1) : 0), jStarts = (right || left ? (left ? 1 : (this.size as number) - 1) : 0);

        const findObject = (object: pieceObject) => {
            return history.filter((key) => object.x === key.x && object.y === key.y)[0];
        };

        for (let k = 0; k < (this.size as number); k++) {
            for (let i = iStarts; i >= 0 && i < (this.size as number); i += iPlus) {
                for (let j = jStarts; j >= 0 && j < (this.size as number); j += jPlus) {
                    let next = { x: i + xPlus, y: j + yPlus }, current: pieceObject = { x: i, y: j };

                    if (this.board[next.x][next.y] === 0 && this.board[current.x][current.y] === 0) continue;

                    if (this.board[next.x][next.y] === 0 && this.board[current.x][current.y] != 0) {
                        this.board[next.x][next.y] = this.board[current.x][current.y];
                        this.board[current.x][current.y] = 0;

                        if (findObject(current)) {
                            history.splice(history.findIndex(ele => JSON.stringify(ele) === JSON.stringify(current)), 1)
                            history.push(next);
                        }
                    } else if (this.board[next.x][next.y] === this.board[current.x][current.y] && !findObject(next) && !findObject(current)) {
                        this.board[next.x][next.y] = (this.board[current.x][current.y] as number) * 2;
                        this.board[current.x][current.y] = 0;

                        history.push(next);
                    }
                }
            }
        }
    }

    checkEnd() {
        for (let i = 0; i < (this.size as number); i++) {
            for (let j = 0; j < (this.size as number); j++) {
                if (this.board[i][j] === 0) {
                    return false
                } else if (this.board[i][j] === 8192) {
                    return true
                }
            }
        }

        return true
    }

    addCard() {
        let x = Math.floor(Math.random() * (this.size as number)), y = Math.floor(Math.random() * (this.size as number));

        if (this.board[x][y] === 0) {
            this.board[x][y] = 2;
        } else this.addCard();
    }

    handleMessage(board: Array<Array<number>>) {
        let amount = Math.ceil(board.length / 4);
        let points = 0;

        board.map(e => e.filter(i => i !== 2).map(i => points += this.emojis.find(e => e.value === i)!.value))

        let message = `${points.toString().split("").map(i => emojis[Number(i) as number]).join('')}\n\n`;

        for (let i = 0; i < board.length; i++) {
            message += board[i].map(e => this.emojis.find(emoji => emoji.value === e)!.name).join("") + '\n'
        }

        return message;

    }
}