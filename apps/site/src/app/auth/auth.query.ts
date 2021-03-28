import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<Auth> {
  isLoggedIn$ = this.select((state) => state.token).pipe(
    map((token) => {
      console.log({ token });
      return !this.authService.tokenHasExpired(token);
    })
  );

  constructor(
    protected store: AuthStore,
    private readonly authService: AuthService
  ) {
    super(store);
  }
}
