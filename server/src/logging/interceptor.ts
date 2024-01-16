import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

export class HttpLoggerInterceptor implements NestInterceptor {
  private logger: Logger = new Logger(HttpLoggerInterceptor.name);

  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { statusCode } = response;

    const { originalUrl, method, body } = request;

    return next.handle().pipe(
      tap((data) => {
        this.logger.log(`${method}::${originalUrl}`);
        this.logger.log(`Body:: ${JSON.stringify(body)}`);
        this.logger.log(`Response:: ${statusCode}, ${JSON.stringify(data)}`);
      }),
    );
  }
}
