import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'ngx-leader-form',
    templateUrl: './leader-form.component.html',
    styleUrls: ['./leader-form.component.scss'],
})
export class LeaderFormComponent {
    @Input() title: string;

    constructor(protected ref: NbDialogRef<LeaderFormComponent>) { }

    get dismiss() {
        return this.ref.close();
    }
}
