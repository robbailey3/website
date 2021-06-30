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
  result?: T | T[];
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
      map((result: any) => {
        let count: number;
        if (Array.isArray(result)) {
          count = result.length;
        } else {
          count = result ? 1 : 0;
        }
        return {
          status: response.statusCode,
          timestamp: Date.now(),
          count,
          result
        };
      })
    );
  }
}
