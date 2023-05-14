import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { AceLogger } from '../utils/ace-logger';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const startTime = Date.now();
      const result = await next();
      AceLogger.logger.info('cost time: ', Date.now() - startTime);
      return result;
    };
  }

  static getName(): string {
    return 'report';
  }
}
