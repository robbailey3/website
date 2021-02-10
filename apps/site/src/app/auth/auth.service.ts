import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { APIResponse } from '../shared/types/ApiResponse';
import { LoginResponse } from './types/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.API_URL}/auth`;

  constructor(private readonly http: HttpClient) {}

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<APIResponse<LoginResponse>>(`${this.API_URL}/login`, {
        email,
        password
      })
      .pipe(map((response) => response.result));
  }
}
