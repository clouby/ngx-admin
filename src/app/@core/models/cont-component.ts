import { Type } from '@angular/core';

interface LoadedProps {
    data?: any;
    form?: any;
}

export class ContComponent {
    constructor(public component: Type<any>, public data: LoadedProps, public config: object = {}) { }
}
