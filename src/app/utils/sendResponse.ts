import { Response } from 'express';

type TMetaData = {
  page: number | null;
  limit: number | null;
  total: number | null;
};

export type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: TMetaData;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    statusCode: data?.statusCode,
    message: data?.message,
    meta: data?.meta,
    data: data.data,
  });
};
export default sendResponse;
