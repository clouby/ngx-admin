import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../@core/data/users.service';

@Component({
    selector: 'ngx-view-activity',
    templateUrl: './view-activity.component.html',
    styleUrls: ['./view-activity.component.scss'],
})
export class ViewActivityComponent implements OnInit {
    lifetime: Array<any>;

    constructor(private us: UserService) { }

    ngOnInit() {
        this.us.getUsers()
            .subscribe(users => {
                this.lifetime = [
                    { user: users.nick, role: 'Novice', status: 'danger', date: new Date(), head: false },
                    { user: users.eva, role: 'Leader', status: 'danger', date: new Date(), head: false },
                    { user: users.jack, role: 'Novice', status: 'danger', date: new Date(), head: false },
                    { user: users.lee, role: 'Novice', status: 'danger', date: new Date(), head: false },
                    { user: users.alan, role: 'Assist', status: 'warning', date: new Date(), head: false },
                    { user: users.kate, role: 'Novice', status: 'danger', date: new Date(), head: false },
                    { user: users.alan, role: 'Assist', status: 'info', date: new Date(), head: true },
                ];
            });
    }
}
