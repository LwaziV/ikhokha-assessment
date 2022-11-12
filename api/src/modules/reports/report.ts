import { Request, Response } from 'express';
import { HttpResponse } from '../shared/http-response-helper';
import { readFileSync, promises as fsPromises } from 'fs';
import { Blob } from 'buffer';
var blob = require('node-blob');
var path = require('path');

// Calculates the number of reviews in the latest comments doc
// Each line is essentially a review from one customer/user
export const getTotalNumberOfReviews = async (req: Request, res: Response) => {
    try {
        var resolvedPath = path.resolve('./src/docs/comments.txt');
        let fileLines = (await fsPromises.readFile(resolvedPath, 'utf-8')).split('\n');
        return HttpResponse.ok(res, fileLines.length);
    } catch (error) {
        return HttpResponse.badRequest(error)
    }
};

// Get today's reviews and comments
export const viewReport = async (req: Request, res: Response) => {
    try {
        let date = new Date();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
        const newdate = year + "/" + month + "/" + day;

        let content: any;
        var resolvedPath = path.resolve('./src/docs/comments.txt');
        fsPromises.readFile(resolvedPath, 'utf-8').then((reviews: any) => {
            content = reviews;
            if (content.length > 0) {
                return HttpResponse.ok(res, content);
            }
        }, (err) => {
            console.log("Failed to get reviews", err);
        });
    } catch (error) {
        return HttpResponse.badRequest(res, error)
    }
};