import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private readonly localStorage: any) {}

  public getItem(key: string): string {
    return this.localStorage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    this.localStorage.setItem(key, value);
  }

  public deleteItem(key: string): void {
    this.localStorage.deleteItem(key);
  }
}
