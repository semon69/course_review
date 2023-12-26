import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../globalInterface/globalInterface';

const handleValidationError = (error: mongoose.Error.ValidationError): TGenericErrorResponse => {

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: error.message
  };
};
export default handleValidationError;