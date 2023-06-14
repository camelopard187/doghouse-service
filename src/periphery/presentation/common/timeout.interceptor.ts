import { Injectable, RequestTimeoutException } from '@nestjs/common'
import { catchError, timeout } from 'rxjs/operators'
import { throwError, TimeoutError } from 'rxjs'
import type { Observable } from 'rxjs'
import type {
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(5000),
      catchError(error =>
        throwError(() =>
          error instanceof TimeoutError
            ? new RequestTimeoutException(
                'The request took too long to process'
              )
            : error
        )
      )
    )
  }
}
