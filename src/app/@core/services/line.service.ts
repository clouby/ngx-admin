import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from './core.service';
import { StatusLoading } from './../utils/status-loading.class';
import { retry, catchError, tap, finalize } from 'rxjs/operators';

interface Line {
    _id: string;
    name: string;
}

interface CollectionLine {
    LINE_RESEARCH: Array<Line>;
    TRAINING_CENTER: Array<Line>;
}

@Injectable()
export class LineService extends StatusLoading {

    constructor(private http: HttpClient, private core: CoreService) {
        super(true);
    }

    get all(): Promise<any> {
        return this.http.get<CollectionLine>(this.core.joinUrl('lines'), this.core.httpOptions)
            .pipe(
                tap(this.reset_load),
                retry(2),
                catchError(this.core.handleError(['line_research', 'training_center'])),
                finalize(this.end_load),
            ).toPromise();
    }

}
