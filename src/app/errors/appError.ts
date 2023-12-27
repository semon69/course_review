export class AppError extends Error {
  public statusCode: number;
  public authError: boolean;
  constructor(statusCode: number, message: string, authError=false, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.authError = authError;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
