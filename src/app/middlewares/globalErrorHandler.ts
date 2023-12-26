/* eslint-disable no-dupe-else-if */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleCastError from '../errors/handleCastError';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleDuplicateKeyError from '../errors/handleDuplicateError';
import { AppError } from '../errors/appError';
import httpStatus from 'http-status';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';
  let errorMessage = error.errorMessage || 'Something went wrong';
  let errorDetails = error || 'Something Went Wrong';

  if (statusCode === httpStatus.UNAUTHORIZED) {
    errorMessage =
      'You do not have the necessary permissions to access this resource.';
    errorDetails = null;
    error.stack = null;
  }

  if (error instanceof ZodError) {
    const getErrors = handleZodError(error);
    statusCode = getErrors.statusCode;
    message = getErrors.message;
    errorMessage = getErrors.errorMessage;
  } else if (error?.name === 'ValidationError') {
    const getErrors = handleValidationError(error);
    statusCode = getErrors?.statusCode;
    message = getErrors?.message;
    errorMessage = getErrors.errorMessage;
  } else if (error?.name === 'CastError') {
    const getErrors = handleCastError(error);
    statusCode = getErrors?.statusCode;
    message = getErrors?.message;
    errorMessage = getErrors.errorMessage;
  } else if (error?.code === 11000) {
    const getErrors = handleDuplicateKeyError(error);
    statusCode = getErrors?.statusCode;
    message = getErrors?.message;
    errorMessage = getErrors?.errorMessage;
  } else if (error instanceof Error) {
    message = error?.message;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message;
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorMessage: errorMessage,
    errorDetails,
    stack: config?.NODE_ENV === 'development' ? error?.stack : null,
  });
};
