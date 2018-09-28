import { Injectable } from "@angular/core";
import { NbAuthService, NbAuthJWTToken } from "@nebular/auth";
import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable()
export class CoreService {

    httpOptions: any = {}
    private token: string = null;
    private URL = 'http://localhost:4000/api/';

    constructor(private auth: NbAuthService) {
        this.initService();
    }

    initService() {
        this.auth.onTokenChange().subscribe((token: NbAuthJWTToken) => {
            if (token.isValid()) {
                this.s_token = token.getValue();
            } else {
                this.s_token = null;
            }
            this.httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': this.g_token ? `bearer ${this.g_token}` : ''
                })
            }
        })
    }

    set s_token(token) {
        this.token = token;
    }

    get g_token() {
        return this.token;
    }

    get server() {
        return this.URL;
    }

    handleError(ACTION: string, data?: any) {
        return (error: HttpErrorResponse) => {
            if (error.error instanceof ErrorEvent) {
                console.log(`[CLIENT:${ACTION}] -> `, error.error.message);
            } else {
                console.log(`[SERVER:${ACTION}] -> `, error.error);
            }

            return throwError(`Upps! We have a problem...`);
        }
    }

    joinUrl(...paths) {
        return this.server + paths.join('/')
    }
}   