import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';
    let details:
      Array<{ field?: string; message: string; code: string }> | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      if (typeof exceptionResponse === 'object') {
        message = exceptionResponse.message || exception.message;

        // Trata os erros de validação do class-validator
        if (Array.isArray(exceptionResponse.message)) {
          message = 'Erro de validação nos dados enviados.';
          details = exceptionResponse.message.map((msg: string) => ({
            code: 'VALIDATION_ERROR',
            message: msg,
          }));
        }
      } else {
        message = exceptionResponse;
      }
    }

    response.status(status).json({
      success: false,
      message,
      data: null,
      error: {
        code: `HTTP_${status}`,
        message,
        details,
      },
      errors: [
        {
          code: `HTTP_${status}`,
          message,
          details,
        },
      ],
    });
  }
}
