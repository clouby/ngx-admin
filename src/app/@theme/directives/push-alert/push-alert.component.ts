import { Component, OnInit } from '@angular/core';
import { PushAlert, AlertTypes } from '../../../@core/models/push-alert';
import { PushAlertService } from '../../../@core/services';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    moduleId: module.id,
    selector: 'ngx-push-alert',
    template: `
        <div class="push-container">
            <nb-alert [@InSlide]="'main'" *ngFor="let a of alerts" closable (close)="onClose(a)" status="{{ls(a)}}">
                {{a.message}}
            </nb-alert>
        </div>
    `,
    styleUrls: ['./push-alert.component.scss'],
    animations: [
        trigger('InSlide', [
            state('main', style({ transform: 'translate(0, 0)', opacity: '1' })),
            transition('void => *', [
                style({ transform: 'translateY(-50%)', opacity: '0.5' }),
                animate('0.5s ease'),
            ]),
            transition('* => void', [
                animate('0.3s ease', style({ transform: 'translateX(100%)', display: 'none', opacity: '0' })),
            ]),
        ]),
    ],
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
            this.alerts.unshift(alert);
        });
    }

    onClose(alert: PushAlert): void {
        this.alerts = this.alerts.filter(a => a !== alert);
    }

    ls(alert: PushAlert): string {
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
