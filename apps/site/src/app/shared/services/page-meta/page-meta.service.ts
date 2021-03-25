import { Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PageMetaService {
  constructor(private readonly title: Title, private readonly meta: Meta) {}

  public getTitle() {
    return this.title.getTitle();
  }

  public setTitle(newTitle: string): this {
    this.title.setTitle(newTitle);
    return this;
  }

  public updateMetaTag(tag: MetaDefinition, selector?: string) {
    this.meta.updateTag(tag, selector);
    return this;
  }
}
