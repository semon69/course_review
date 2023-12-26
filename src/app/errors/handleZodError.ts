import { ZodError } from 'zod';
import {
  TGenericErrorResponse,
} from '../globalInterface/globalInterface';

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: error.message
  };
};

export default handleZodError;
