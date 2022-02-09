import defaultGameOptions from '../typings/defaultGameOptions';

export default class gameStructure implements defaultGameOptions {
    name: string;
    description: string;
    user: any;

    constructor(options: defaultGameOptions) {
        this.name = options.name;
        this.description = options.description

        this.user = options.user
    }
}