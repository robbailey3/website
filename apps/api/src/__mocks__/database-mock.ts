import { BehaviorSubject, Observable } from 'rxjs';

export class MockDatabaseService {
  public isLoaded = new BehaviorSubject(true); // Default this to true so we don't have to pretend to wait

  public collection = {
    find: () => jest.fn().mockReturnValue(new Observable()),
    findOne: () => jest.fn().mockReturnValue(new Observable()),
    insertOne: () => jest.fn().mockReturnValue(new Observable())
  };
}
