import { Type } from '@angular/core';

export class ContComponent {
    constructor(public component: Type<any>, public data: any, public config: object = {}) { }
}
