/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client';

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../config';
import { IGenericErrorMessage, IGenericErrorResponse } from '../../interface/common';

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = httpStatus.BAD_REQUEST as number;
  let message =
    config.env === 'development'
      ? err.message
      : 'Unhandled Exceptions ! The server could not process the request due to invalid or missing data..';
  let errorMessages: IGenericErrorMessage[] = [];

  if (config.env === 'development') {
    if (err instanceof Prisma.PrismaClientValidationError) {
      const simplifiedError = handleValidationError(err);
      const lines = err.message.trim().split('\n');

      statusCode = simplifiedError.statusCode;
      message = lines[lines.length - 1];
      errorMessages = simplifiedError.errorMessages;
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
      const simplifiedError = handleClientError(err);
      const lines = err.message.trim().split('\n');

      statusCode = simplifiedError.statusCode;
      message = lines[lines.length - 1];
      errorMessages = simplifiedError.errorMessages;
    } else if (err instanceof ApiError) {
      statusCode = err?.statusCode;
      message = err.message;
      errorMessages = err?.message
        ? [
            {
              path: '',
              message: err?.message,
            },
          ]
        : [];
    } else if (err instanceof Error) {
      statusCode = httpStatus.BAD_REQUEST;
      message = err.message;
      errorMessages = err?.message
        ? [
            {
              path: '',
              message: err?.message,
            },
          ]
        : [];
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
};

export default globalErrorHandler;

export const handleValidationError = (
  error: Prisma.PrismaClientValidationError
): IGenericErrorResponse => {
  const errors = [
    {
      path: '',
      message: error.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  let errors: IGenericErrorMessage[] = [];
  let message = error?.message;
  const statusCode = 400;

  if (error?.code === 'P2025') {
    message = (error.meta?.cause as string) || 'Record not found!';
    errors = [
      {
        path: '',
        message,
      },
    ];
  } else if (error?.code === 'P2003') {
    if (error.message.includes('delete()` invocation:')) {
      message = 'Delete-Operation failed';
      errors = [
        {
          path: '',
          message,
        },
      ];
    }
  }

  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
