import { Injectable } from '@angular/core';
import { CoreService, DefineRequest } from './core.service';
import { StatusLoading } from './../utils/status-loading.class';
import { Observable } from 'rxjs';
import { UserInterface } from '../models/User.model';

@Injectable()
export class UserService extends StatusLoading {
  private main_path: Array<string> = ['user'];
  public loadingPers: StatusLoading;

  constructor(private core: CoreService, private sl: StatusLoading) {
    super();
    this.loadingPers = this.sl.load;
  }

  private paths(wrap_paths: Array<string> = []) {
    return [...this.main_path, ...wrap_paths];
  }

  private get errorIndexMessage() {
    return this.main_path.join('_');
  }

  private createUser(data: UserInterface): Observable<any> {
    return this.core.postHandler(<DefineRequest>{
      paths: this.paths(['create']),
      error_fields: [this.errorIndexMessage],
      data,
    });
  }

  create(data: UserInterface): Observable<any> {
    return this.loadingPers.loading_request(this.createUser(data));
  }
}
