import { Component, OnInit } from '@angular/core';
import { PushAlert, AlertTypes } from '../../../@core/models/push-alert';
import { PushAlertService } from '../../../@core/services';

@Component({
    moduleId: module.id,
    selector: 'ngx-push-alert',
    template: `
        <div class="psuh-container">
            <nb-alert *ngFor="let a of alerts" closable (close)="onClose(a.type)" status="{{lStatus(a)}}">
                {{a.message}}
            </nb-alert>
        </div>
    `,
    styleUrls: ['./push-alert.component.scss'],
})
export class PushAlertComponent implements OnInit {
    alerts: PushAlert[] = [];

    constructor(private pas: PushAlertService) { }

    ngOnInit(): void {
        this.pas.getAlerts.subscribe((alert: PushAlert) => {
            if (!alert) {
                this.alerts = [];
                return;
            }
            this.alerts.push(alert);
        });
    }

    onClose(alert: PushAlert) {
        this.alerts = this.alerts.filter(a => a !== alert);
    }

    lStatus(alert: PushAlert): string {
        if (!alert) return;
        switch (alert.type) {
            case AlertTypes.Success:
                return 'success';
            case AlertTypes.Warning:
                return 'warning';
            case AlertTypes.Info:
                return 'info';
            case AlertTypes.Error:
                return 'danger';
        }
    }
}
