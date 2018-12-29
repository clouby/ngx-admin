import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { throwError, Observable, empty } from 'rxjs';
import { environment } from '../../../environments/environment';
import { retry, catchError, merge } from 'rxjs/operators';

export declare interface DefineRequest {
  paths: Array<string>;
  error_fields: Array<string>;
  data?: any;
}
@Injectable({
  providedIn: 'root',
})
export class CoreService {
  httpOptions: any = {};
  private token: string = null;
  private URL = environment.server_endpoint + '/';
  protected container: string;

  constructor(private auth: NbAuthService, private http: HttpClient) {
    this.initService();
  }

  initService() {
    this.auth.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      this.s_token = token.isValid() ? token.getValue() : null;

      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.g_token ? `bearer ${this.g_token}` : '',
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

  private errorMerge(error_fields = []): Observable<any> {
    return empty().pipe(
      retry(2),
      catchError(this.handleError(error_fields)),
    );
  }

  public getHandler({ paths, error_fields }: DefineRequest): Observable<any> {
    return this.http
      .get<any>(this.joinUrl(...paths), this.httpOptions)
      .pipe(merge(this.errorMerge(error_fields)));
  }

  public postHandler({ paths, data, error_fields }: DefineRequest) {
    return this.http
      .post<any>(this.joinUrl(...paths), data, this.httpOptions)
      .pipe(merge(this.errorMerge(error_fields)));
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
          error,
        });
      }
    };
  }
}
