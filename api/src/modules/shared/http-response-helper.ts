import { Response } from 'express';
import { HttpStatusCode } from './http-status-codes';

export abstract class HttpResponse {
    public static ok(res: Response, data?: unknown) {
        res.status(HttpStatusCode.OK).json(data);
    }
    public static badRequest(res: Response, message?: string) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: message });
    }
}