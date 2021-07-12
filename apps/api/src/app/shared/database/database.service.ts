import { ConfigService } from '@nestjs/config';
import { Subject } from 'rxjs';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Collection, Db, MongoClient } from 'mongodb';

@Injectable()
export class DatabaseService implements OnModuleInit {
  public isLoaded: Subject<void> = new Subject();

  private client: MongoClient;

  private db: Db;

  private DB_URL: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly log: Logger
  ) {
    this.DB_URL = this.configService.get<string>('DB_URL');
  }

  public onModuleInit() {
    this.connect();
  }

  private async connect(): Promise<void> {
    try {
      this.client = await MongoClient.connect(this.DB_URL, {
        useUnifiedTopology: true
      });
      this.db = this.client.db();
      this.isLoaded.next();
    } catch ($e) {
      this.log.error($e);
    }
  }

  public setDB(dbName: string): this {
    this.db = this.client.db(dbName);
    return this;
  }

  public getCollection<T>(collectionName: string): Collection<T> {
    return this.db.collection<T>(collectionName);
  }
}
