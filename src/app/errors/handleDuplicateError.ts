/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    TGenericErrorResponse,
  } from '../globalInterface/globalInterface';
  
  const handleDuplicateKeyError = (error: any): TGenericErrorResponse => {
    const match = error.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
  
    const statusCode = 400;
  
    return {
      statusCode,
      message: 'Duplicate key error',
      errorMessage: `${extractedMessage} is already exists`
    };
  };
  export default handleDuplicateKeyError;