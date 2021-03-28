import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { APIResponse } from '../shared/types/ApiResponse';
import { AuthStore } from './auth.store';
import { LoginResponse } from './types/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.API_URL}/auth`;

  constructor(
    private readonly http: HttpClient,
    @Inject(WINDOW) private readonly window: Window,
    private readonly authStore: AuthStore
  ) {}

  public login(email: string, password: string): Observable<void> {
    return this.http
      .post<APIResponse<LoginResponse>>(`${this.API_URL}/login`, {
        email,
        password
      })
      .pipe(
        map((response) => {
          this.saveTokenToLocalStorage(response.result.token);
          this.authStore.login(response.result);
        })
      );
  }

  public saveTokenToLocalStorage(token: string): void {
    if ('localStorage' in this.window) {
      this.window.localStorage.setItem('auth_token', token);
    }
  }

  public tokenHasExpired(token: string): boolean {
    try {
      // eslint-disable-next-line dot-notation
      return jwt_decode(token)['exp'] < Date.now() / 1000 + 60;
    } catch ($e) {
      return true;
    }
  }

  public isLoggedIn(token: string): boolean {
    if (!token) {
      return false;
    }
    return !this.tokenHasExpired(token);
  }

  public logout() {
    this.authStore.logout();
  }
}
