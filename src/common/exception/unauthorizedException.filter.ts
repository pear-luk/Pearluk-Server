import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UnauthorizedExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const error = exception.getResponse();
    const req = ctx.getRequest();
    const { ip, method, originalUrl, body } = req;
    const userAgent = req.get('user-agent');
    this.logger.error(
      typeof error === 'string' ? error : JSON.stringify(error),
      body,
      `unauth ${method} ${originalUrl} ${statusCode} ${ip} ${userAgent} `,
    );
    if (typeof error === 'string' || Array.isArray(error)) {
      response.clearCookie('access_token');
      response
        .status(statusCode)
        .json({ is_success: false, status_code: statusCode, message: error });
    } else {
      response.clearCookie('access_token');
      response.status(statusCode).json({
        is_success: false,
        status_code: statusCode,
        code: error.code,
        message: error.message,
        error: error.error,
      });
    }
  }
}
