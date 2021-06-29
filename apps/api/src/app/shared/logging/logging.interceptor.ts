import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    const ctxHttp = context.switchToHttp();
    const req: Request = ctxHttp.getRequest();
    const res: Response = ctxHttp.getResponse();
    const requestBody = req.body;
    if (requestBody.password) {
      // If the request has a password in it, we obscure it.
      requestBody.password = '******';
    }

    const rqLog = {
      timestamp: Date.now(),
      query: req.query,
      url: req.url,
      body: req.body,
      headers: req.headers,
      host: req.hostname,
      httpVersion: req.httpVersion,
      user: (req as any).user,
      protocol: req.protocol,
      cookies: req.cookies,
      method: req.method,
      ip: req.ip,
      status: res.status
    };

    Logger.log(JSON.stringify(rqLog));
    return next.handle();
  }
}
