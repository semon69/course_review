import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../globalInterface/globalInterface';


const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage: error.message
  };
};
export default handleCastError