export enum AlertTypes {
    Success,
    Warning,
    Error,
    Info,
}

export class PushAlert {
    type: AlertTypes;
    message: string;

    constructor(init?: PushAlert) {
        Object.assign(this, init);
    }
}
