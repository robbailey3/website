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
  MongoCountPreferences,
  UpdateManyOptions,
  UpdateOneOptions,
  UpdateQuery,
  UpdateWriteOpResult
} from 'mongodb';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseService } from '../database/database.service';

export abstract class EntityService {
  private readonly collection: Collection;

  constructor(
    protected readonly database: DatabaseService,
    protected readonly collectionName: string
  ) {
    this.collection = database.getCollection(collectionName);
  }

  public stats(options?: { scale: number; session?: ClientSession }) {
    return from(this.collection.stats(options));
  }

  public options(options?: { session: ClientSession }) {
    return from(this.collection.options(options));
  }

  public find<T>(
    query: FilterQuery<T> = {},
    options: FindOneOptions<T extends any ? any : T> = {}
  ): Observable<T[]> {
    return from(this.collection.find<T>(query, options).toArray());
  }

  public findOne<T>(
    query: FilterQuery<T> = {},
    options: FindOneOptions<T extends any ? any : T> = {}
  ): Observable<T> {
    return from(this.collection.findOne<T>(query, options));
  }

  public findDistinct<T>(
    key: string,
    filter: FilterQuery<T> = {},
    options: CommonOptions = {}
  ): Observable<T[]> {
    return from(this.collection.distinct(key, filter, options));
  }

  public countDocuments<T>(
    filter: FilterQuery<T> = {},
    options: MongoCountPreferences = {}
  ): Observable<number> {
    return from(this.collection.countDocuments(filter, options));
  }

  public getEstimatedDocumentCount<T>(
    query: FilterQuery<T>,
    options: MongoCountPreferences = {}
  ): Observable<number> {
    return from(this.collection.estimatedDocumentCount(query, options));
  }

  public findOneAndUpdate<T>(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: FindOneAndUpdateOption<T> = {}
  ): Observable<FindAndModifyWriteOpResultObject<T>> {
    return from(this.collection.findOneAndUpdate(filter, update, options));
  }

  public findOneAndReplace<T>(
    filter: FilterQuery<T>,
    replacement: Record<string, unknown>,
    options: FindOneAndReplaceOption<T> = {}
  ): Observable<FindAndModifyWriteOpResultObject<T>> {
    return from(
      this.collection.findOneAndReplace(filter, replacement, options)
    );
  }

  public findOneAndDelete<T>(
    filter: FilterQuery<T>,
    options: FindOneAndDeleteOption<T> = {}
  ): Observable<FindAndModifyWriteOpResultObject<T>> {
    return from(this.collection.findOneAndDelete(filter, options));
  }

  public updateOne<T>(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: UpdateOneOptions = {}
  ): Observable<UpdateWriteOpResult> {
    return from(this.collection.updateOne(filter, update, options));
  }

  public updateMany<T>(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: UpdateManyOptions = {}
  ) {
    return from(this.collection.updateMany(filter, update, options));
  }

  public insertOne<T>(
    document: T,
    options: CollectionInsertOneOptions = {}
  ): Observable<T> {
    return from(this.collection.insertOne(document, options)).pipe(
      map((result) => result.ops[0])
    );
  }

  public insertMany<T>(
    documents: T[],
    options: CollectionInsertManyOptions = {}
  ): Observable<T[]> {
    return from(this.collection.insertMany(documents, options)).pipe(
      map((result) => result.ops)
    );
  }

  public deleteOne<T>(
    filter: FilterQuery<T>,
    options: CommonOptions = {}
  ): Observable<DeleteWriteOpResultObject> {
    return from(this.collection.deleteOne(filter, options));
  }

  public deleteMany<T>(
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
