import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { MongooseQueryParser } from 'mongoose-query-parser';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class QueryParserInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    const parser = new MongooseQueryParser();
    const req: Request = context.switchToHttp().getRequest();
    req.query = parser.parse(req.query) as any;
    req.query.limit = !req.query.limit
      ? 100
      : (Math.min(parseInt(req.query.limit as string, 10), 100) as any);

    return next.handle();
  }
}
