import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { PushAlert, AlertTypes } from '../models/push-alert';

/*
* Inspired by: https://github.com/cornflourblue/angular2-alert-notifications.
*/

@Injectable()
export class PushAlertService {
    private subject = new Subject<PushAlert>();

    constructor(private router: Router) {
        this.router.events.subscribe(event =>
            (event instanceof NavigationStart) && this.clear());
    }

    get getAlerts(): Observable<PushAlert> {
        return this.subject.asObservable();
    }

    success(message: string): void {
        this.subject.next(new PushAlert({ message, type: AlertTypes.Success }));
    }

    error(message: string): void {
        this.subject.next(new PushAlert({ message, type: AlertTypes.Error }));
    }

    clear(): void {
        this.subject.next(null);
    }
}

