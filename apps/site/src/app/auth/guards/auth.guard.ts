import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthQuery } from '../auth.query';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authQuery: AuthQuery,
    private readonly router: Router
  ) {}

  public canActivate(): Observable<boolean> {
    return this.authQuery.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
      })
    );
  }
}
