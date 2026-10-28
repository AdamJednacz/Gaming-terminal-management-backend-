import { Response } from 'express';

export type ApiResponse<T> = Promise<Response<T>>;
