import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CoreService } from "./core.service";
import { StatusLoading } from "./../utils/status-loading.class";
import { retry, catchError, tap, finalize } from "rxjs/operators";

interface LineResearch {
    _id: string,
    name: string
}

@Injectable()
export class LineService extends StatusLoading {

    constructor(private http: HttpClient, private core: CoreService) {
        super(true);
    }

    all(): Promise<any> {
        return this.http.get<LineResearch[]>(this.core.joinUrl('lines'), this.core.httpOptions)
            .pipe(
                tap(this.reset_load),
                retry(3),
                catchError(this.core.handleError('ALL-LINE-RESEACH')),
                finalize(this.end_load)
            ).toPromise()
    }

}