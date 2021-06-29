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

  constructor(private readonly configService: ConfigService) {
    this.DB_URL = this.configService.get<string>('DB_URL');
  }

  public onModuleInit() {
    this.connect();
  }

  private connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      MongoClient.connect(this.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000
      })
        .then((client: MongoClient) => {
          Logger.log('Connected to database', DatabaseService.name);
          this.client = client;
          this.db = this.client.db();
          // this.setupInitialUser();
          this.isLoaded.next();
          resolve();
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }

  public setDB(dbName: string): this {
    this.db = this.client.db(dbName);
    return this;
  }

  public getCollection<T>(collectionName: string): Collection<T> {
    return this.db.collection<T>(collectionName);
  }
}
