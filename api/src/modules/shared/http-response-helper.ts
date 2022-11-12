import { Response } from 'express';
import { HttpStatusCode } from './http-status-codes';

export abstract class HttpResponse {
    public static ok(res: Response, data?: unknown) {
        res.status(HttpStatusCode.OK).json(data);
    }

    public static validationError(res: Response) {
        res.status(HttpStatusCode.BAD_REQUEST).json()
    }

    public static badRequest(res: Response, message?: string) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: message });
    }

    public static internalServerError(res: Response, data?: unknown) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(data);
    }

    public static notFound(res: Response, data?: unknown) {
        res.status(HttpStatusCode.NOT_FOUND).json(data);
    }
}