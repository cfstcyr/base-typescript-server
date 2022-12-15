import express from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { HttpException } from '../models/http-exception';
import { env } from '../utils/environment';

interface ErrorResponse {
    message: string;
    error: string;
    stack?: string[];
}

export function errorHandler(
    error: Error,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction,
) {
    const status =
        error instanceof HttpException
            ? error.status
            : StatusCodes.INTERNAL_SERVER_ERROR;

    const response: ErrorResponse = {
        message: error.message,
        error: getReasonPhrase(status),
    };

    if (env('NODE_ENV') === 'development') {
        response.stack = error.stack?.split('\n');
    }

    res.status(status).json(response);
}
