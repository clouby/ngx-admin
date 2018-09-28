import { Injectable } from "@angular/core";
import { CoreService } from "./core.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RequestService {
    constructor(private http: HttpClient, private core: CoreService) { }

    all(...paths): Observable<any> {
        return this.http.get(this.core.joinUrl(...paths), this.core.httpOptions)
    }
}