import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private readonly title: Title, private readonly meta: Meta) {}

  public setTitle(newTitle: string): void {
    this.title.setTitle(newTitle);
  }
}
