import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Response<T> {
  results?: T[];
  result?: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((results: any) => {
        let count: number;
        if (Array.isArray(results)) {
          count = results.length;
        } else {
          count = results ? 1 : 0;
        }
        const common = {
          status: response.statusCode,
          timestamp: Date.now(),
          count
        };
        return {
          ...common,
          ...(Array.isArray(results) ? { results } : { result: results })
        };
      })
    );
  }
}
