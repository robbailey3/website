/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { IndexSpecification } from 'mongodb';
import { DatabaseService } from '../shared/database/database.service';
import { EntityService } from '../shared/entity-service/entity.service';

@Injectable()
export class BlogService extends EntityService {
  constructor(db: DatabaseService) {
    super(db, 'blog');

    this.initIndex();
  }

  public slugifyTitle(title: string): string {
    title = title.replace(/^\s+|\s+$/g, ''); // trim
    title = title.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaaeeeeiiiioooouuuunc------';

    for (let i = 0, l = from.length; i < l; i += 1) {
      title = title.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    title = title
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return title;
  }

  private initIndex() {
    this.database.isLoaded.subscribe({
      next: () => {
        this.createIndex({ title: 'text' } as any, {
          default_language: 'english'
        });
      }
    });
  }
}
