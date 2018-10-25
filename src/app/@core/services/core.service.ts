import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable()
export class CoreService {

    httpOptions: any = {};
    private token: string = null;
    private URL = 'http://localhost:4000/api/';

    constructor(private auth: NbAuthService) {
        this.initService();
    }

    initService() {
        this.auth.onTokenChange().subscribe((token: NbAuthJWTToken) => {

            this.s_token = token.isValid() ? token.getValue() : null

            this.httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': this.g_token ? `bearer ${this.g_token}` : '',
                }),
            };
        });
    }

    private set s_token(token) {
        this.token = token;
    }

    get g_token() {
        return this.token;
    }

    get server() {
        return this.URL;
    }

    joinUrl = (...paths) => this.server + paths.join('/');

    // FIXME: Please, make me more promising.
    handleError(ACTION: Array<string>, data?: any) {
        return (error: HttpErrorResponse) => {
            const actions = ACTION.join(',').toLocaleUpperCase();

            if (error.error instanceof ErrorEvent) {
                return throwError(`[CLIENT:${actions}] -> ${error.error.message}`);
            } else {
                return throwError({
                    message: `[SERVER:${actions}] -> ${error.error}`,
                    fields: ACTION,
                });
            }
        };
    }
}
