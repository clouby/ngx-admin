import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: NbAuthService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.authService.isAuthenticated()
            .pipe(
                tap(authenticated => (
                    !authenticated && this.router.navigate(['auth/login'])
                ))
            )
    }
}
