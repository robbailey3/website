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
      return this.authService.isLoggedIn(token);
    })
  );

  constructor(
    protected store: AuthStore,
    private readonly authService: AuthService
  ) {
    super(store);
  }
}
