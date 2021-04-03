import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { LocalStorageService } from '../shared/services/local-storage/local-storage.service';
import { Auth, createAuth } from './auth.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<Auth> {
  constructor(private readonly localStorage: LocalStorageService) {
    super(
      createAuth({
        token: localStorage.getItem('auth_token')
      })
    );
  }

  login(auth: Auth) {
    this.update(auth);
  }

  logout() {
    this.localStorage.deleteItem('auth_token');
    this.update({ token: null });
  }
}
