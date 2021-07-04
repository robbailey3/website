import { NotFoundException } from '@nestjs/common';
import {
  ClientSession,
  Collection,
  CollectionAggregationOptions,
  CollectionInsertOneOptions,
  FilterQuery,
  FindOneAndDeleteOption,
  FindOneAndUpdateOption,
  FindOneOptions,
  IndexOptions,
  IndexSpecification,
  MongoCountPreferences,
  UpdateManyOptions,
  UpdateQuery
} from 'mongodb';
import { from } from 'rxjs';
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

  public async find<T extends BaseEntity>(
    query: FilterQuery<T> = {},
    options: FindOneOptions<T extends any ? any : T> = {}
  ): Promise<T[]> {
    const result = await this.collection.find(query, options).toArray();

    if (!result || result.length === 0) {
      throw new NotFoundException('No documents found');
    }

    return result;
  }

  public async findOne<T extends BaseEntity>(
    query: FilterQuery<T> = {},
    options: FindOneOptions<T extends any ? any : T> = {}
  ): Promise<T> {
    const result = await this.collection.findOne(query, options);

    if (!result) {
      throw new NotFoundException('No documents found');
    }

    return result;
  }

  public countDocuments<T extends BaseEntity>(
    filter: FilterQuery<T> = {},
    options: MongoCountPreferences = {}
  ): Promise<number> {
    return this.collection.countDocuments(filter, options);
  }

  public async findOneAndUpdate<T extends BaseEntity>(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: FindOneAndUpdateOption<T> = {}
  ): Promise<T> {
    if (!options.upsert) {
      await this.checkIfDocumentExists(filter);
    }
    await this.collection.findOneAndUpdate(filter, update, options);

    const result = await this.collection.findOneAndUpdate(filter, {
      $set: { dateModified: new Date() }
    });

    return result.value;
  }

  public async findOneAndDelete<T extends BaseEntity>(
    filter: FilterQuery<T>,
    options: FindOneAndDeleteOption<T> = {}
  ): Promise<T> {
    await this.checkIfDocumentExists(filter);

    const result = await this.collection.findOneAndDelete(filter, options);

    return result.value;
  }

  public async insertOne<T extends BaseEntity>(
    document: T,
    options: CollectionInsertOneOptions = {}
  ): Promise<T> {
    const documentToInsert = document;
    documentToInsert.dateModified = new Date();
    documentToInsert.dateAdded = new Date();
    const result = await this.collection.insertOne(documentToInsert, options);

    return this.collection.findOne({ _id: result.insertedId });
  }

  public updateMany<T>(
    filter: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
    options: UpdateManyOptions = {}
  ) {
    return this.collection.updateMany(filter, updateQuery, options);
  }

  public aggregate<T>(
    pipeline: any[] = [],
    options: CollectionAggregationOptions = {}
  ): Promise<T[]> {
    return this.collection.aggregate(pipeline, options).toArray();
  }

  public createIndex(
    fieldOrSpec: IndexSpecification,
    options: IndexOptions = {}
  ) {
    return this.collection.createIndex(fieldOrSpec, options);
  }

  private async checkIfDocumentExists(filter): Promise<void> {
    const document = await this.collection.findOne(filter);
    if (!document) {
      throw new NotFoundException('Document not found');
    }
  }
}
