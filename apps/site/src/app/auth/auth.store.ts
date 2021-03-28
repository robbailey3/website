import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Auth, createAuth } from './auth.model';

const retrieveTokenFromLocalStorage = () => {
  return window.localStorage.getItem('auth_token');
};

const deleteTokenFromLocalStorage = () => {
  return window.localStorage.removeItem('auth_token');
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<Auth> {
  constructor() {
    super(
      createAuth({
        token: retrieveTokenFromLocalStorage()
      })
    );
  }

  login(auth: Auth) {
    this.update(auth);
  }

  logout() {
    deleteTokenFromLocalStorage();
    this.update(createAuth({}));
  }
}
