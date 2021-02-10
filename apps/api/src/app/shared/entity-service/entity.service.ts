import {
  CollectionInsertOneOptions,
  CommonOptions,
  FilterQuery,
  FindOneAndUpdateOption,
  FindOneOptions,
  UpdateOneOptions,
  UpdateQuery
} from 'mongodb';
import { map } from 'rxjs/operators';
import { DatabaseService } from '../database/database.service';

export abstract class EntityService {
  constructor(
    protected readonly database: DatabaseService,
    protected readonly collectionName: string
  ) {}

  public find<T>(
    query: FilterQuery<T>,
    options: FindOneOptions<T extends any ? any : T> = {}
  ) {
    return this.database
      .setCollection(this.collectionName)
      .find<T>(query, options);
  }

  public findOne<T>(
    query: FilterQuery<T>,
    options: FindOneOptions<T extends any ? any : T> = {}
  ) {
    return this.database
      .setCollection(this.collectionName)
      .findOne(query, options);
  }

  public insertOne<T>(
    newDocument: T,
    options: CollectionInsertOneOptions = {}
  ) {
    return this.database
      .setCollection(this.collectionName)
      .insertOne(newDocument, options);
  }

  public updateOne<T>(
    filter: FilterQuery<T>,
    updatedDocument: UpdateQuery<T>,
    options: UpdateOneOptions = {}
  ) {
    return this.database
      .setCollection(this.collectionName)
      .updateOne(filter, { ...updatedDocument }, options);
  }

  public findOneAndUpdate<T>(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: FindOneAndUpdateOption<T> = { returnOriginal: false }
  ) {
    return this.database
      .setCollection(this.collectionName)
      .findOneAndUpdate<T>(filter, update, options)
      .pipe(map((result) => result.value));
  }

  public deleteOne<T>(filter: FilterQuery<T>, options: CommonOptions = {}) {
    return this.database
      .setCollection(this.collectionName)
      .deleteOne<T>(filter, options);
  }
}
