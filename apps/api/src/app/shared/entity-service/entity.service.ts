import { Logger } from '@nestjs/common';
import {
  ClientSession,
  Collection,
  CollectionAggregationOptions,
  CollectionInsertManyOptions,
  CollectionInsertOneOptions,
  CollectionMapFunction,
  CollectionReduceFunction,
  CommonOptions,
  DeleteWriteOpResultObject,
  FilterQuery,
  FindAndModifyWriteOpResultObject,
  FindOneAndDeleteOption,
  FindOneAndReplaceOption,
  FindOneAndUpdateOption,
  FindOneOptions,
  IndexOptions,
  IndexSpecification,
  MapReduceOptions,
  MatchKeysAndValues,
  MongoCountPreferences,
  ObjectId,
  UpdateManyOptions,
  UpdateOneOptions,
  UpdateQuery,
  UpdateWriteOpResult
} from 'mongodb';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BaseEntity } from '../base-entity/base-entity';
import { DatabaseService } from '../database/database.service';

export abstract class EntityService {
  private collection: Collection;

  constructor(
    protected readonly database: DatabaseService,
    protected readonly collectionName: string
  ) {
    database.isLoaded.subscribe({
      next: () => {
        this.collection = database.getCollection(collectionName);
      }
    });
  }

  public stats(options?: { scale: number; session?: ClientSession }) {
    return from(this.collection.stats(options));
  }

  public options(options?: { session: ClientSession }) {
    return from(this.collection.options(options));
  }

  public find<T extends BaseEntity>(
    query: FilterQuery<T> = {},
    options: FindOneOptions<T extends any ? any : T> = {}
  ): Observable<T[]> {
    return from(this.collection.find<T>(query, options).toArray());
  }

  public findOne<T extends BaseEntity>(
    query: FilterQuery<T> = {},
    options: FindOneOptions<T extends any ? any : T> = {}
  ): Observable<T> {
    return from(this.collection.findOne<T>(query, options));
  }

  public findDistinct<T extends BaseEntity>(
    key: string,
    filter: FilterQuery<T> = {},
    options: CommonOptions = {}
  ): Observable<T[]> {
    return from(this.collection.distinct(key, filter, options));
  }

  public countDocuments<T extends BaseEntity>(
    filter: FilterQuery<T> = {},
    options: MongoCountPreferences = {}
  ): Observable<number> {
    return from(this.collection.countDocuments(filter, options));
  }

  public getEstimatedDocumentCount<T extends BaseEntity>(
    query: FilterQuery<T>,
    options: MongoCountPreferences = {}
  ): Observable<number> {
    return from(this.collection.estimatedDocumentCount(query, options));
  }

  public findOneAndUpdate<T extends BaseEntity>(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: FindOneAndUpdateOption<T> = {}
  ): Observable<T> {
    return from(this.collection.findOneAndUpdate(filter, update, options)).pipe(
      switchMap(() =>
        this.findOneAndUpdate<T>(filter, {
          $set: {
            dateModified: new Date()
          } as any
        })
      )
    );
  }

  public findOneAndReplace<T extends BaseEntity>(
    filter: FilterQuery<T>,
    replacement: Record<string, unknown>,
    options: FindOneAndReplaceOption<T> = {}
  ): Observable<FindAndModifyWriteOpResultObject<T>> {
    return from(
      this.collection.findOneAndReplace(filter, replacement, options)
    ).pipe(
      tap(() =>
        this.findOneAndUpdate<BaseEntity>(filter, {
          $set: { dateModified: new Date() }
        })
      ),
      map((result) => result.value)
    );
  }

  public findOneAndDelete<T extends BaseEntity>(
    filter: FilterQuery<T>,
    options: FindOneAndDeleteOption<T> = {}
  ): Observable<FindAndModifyWriteOpResultObject<T>> {
    return from(this.collection.findOneAndDelete(filter, options));
  }

  public updateOne<T extends BaseEntity>(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: UpdateOneOptions = {}
  ): Observable<UpdateWriteOpResult> {
    return from(this.collection.updateOne(filter, update, options)).pipe(
      tap(() =>
        this.updateOne<BaseEntity>(filter, {
          $set: { dateModified: new Date() }
        })
      )
    );
  }

  public updateMany<T extends BaseEntity>(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: UpdateManyOptions = {}
  ): Observable<UpdateWriteOpResult> {
    return from(this.collection.updateMany(filter, update, options)).pipe(
      switchMap(() =>
        this.updateMany<BaseEntity>(filter, {
          $set: { dateModified: new Date() }
        })
      )
    );
  }

  public insertOne<T extends BaseEntity>(
    document: T,
    options: CollectionInsertOneOptions = {}
  ): Observable<T> {
    return from(this.collection.insertOne(document, options)).pipe(
      tap((result) => {
        this.updateMany<BaseEntity>(
          { _id: result.insertedId },
          {
            $set: { dateModified: new Date(), dateAdded: new Date() }
          }
        );
      }),
      map((result) => result.ops[0])
    );
  }

  public insertMany<T extends BaseEntity>(
    documents: T[],
    options: CollectionInsertManyOptions = {}
  ): Observable<T[]> {
    return from(this.collection.insertMany(documents, options)).pipe(
      tap((result) =>
        this.updateMany(
          {
            _id: {
              $in: Object.keys(result.insertedIds).map((key) =>
                ObjectId.createFromHexString(key)
              )
            }
          },
          {
            $set: { dateModified: new Date(), dateAdded: new Date() }
          }
        )
      ),
      map((result) => result.ops)
    );
  }

  public deleteOne<T extends BaseEntity>(
    filter: FilterQuery<T>,
    options: CommonOptions = {}
  ): Observable<DeleteWriteOpResultObject> {
    return from(this.collection.deleteOne(filter, options));
  }

  public deleteMany<T extends BaseEntity>(
    filter: FilterQuery<T>,
    options: CommonOptions = {}
  ): Observable<DeleteWriteOpResultObject> {
    return from(this.collection.deleteMany(filter, options));
  }

  public mapReduce<TSchema, Tkey, TValue>(
    // eslint-disable-next-line no-shadow
    map: string | CollectionMapFunction<TSchema>,
    reduce: string | CollectionReduceFunction<Tkey, TValue>,
    options: MapReduceOptions = {}
  ) {
    return from(this.collection.mapReduce(map, reduce, options));
  }

  public aggregate<T>(
    pipeline: any[] = [],
    options: CollectionAggregationOptions = {}
  ): Observable<T[]> {
    return from(this.collection.aggregate(pipeline, options).toArray());
  }

  public createIndex(
    fieldOrSpec: IndexSpecification,
    options: IndexOptions = {}
  ) {
    return from(this.collection.createIndex(fieldOrSpec, options));
  }

  public createIndexes(
    indexSpecs: IndexSpecification[],
    options: IndexOptions = {}
  ) {
    return from(this.collection.createIndexes(indexSpecs, options));
  }
}
