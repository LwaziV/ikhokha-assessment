import { Request, Response } from 'express';
import { HttpResponse } from '../shared/http-response-helper';
import { readFileSync, promises as fsPromises } from 'fs';
import { Blob } from 'buffer';
import { DateService } from '../../services/date.service';
var blob = require('node-blob');
var path = require('path');

// Calculates the number of reviews in the latest comments doc
// Each line is essentially a review from one customer/user
export const getTotalNumberOfReviews = async (req: Request, res: Response) => {
    try {
        let dateService = new DateService();
        const newdate = dateService.getTodaysDate();
        var resolvedPath = path.resolve('./src/docs/comments-' + `${newdate}` + '.txt');
        let fileLines = (await fsPromises.readFile(resolvedPath, 'utf-8')).split('\n');
        let shakerOccurrences = 0;
        let moverOccurrences = 0;
        fsPromises.readFile(resolvedPath, 'utf-8').then((reviews: any) => {
                // Total number of occurences of "Shaker in the reviews"
                shakerOccurrences = (reviews.toLocaleLowerCase().match(/shaker/g) || []).length;
                // Total number of occurences of "Maker in the reviews"
                moverOccurrences = (reviews.toLocaleLowerCase().match(/mover/g) || []).length;
                return HttpResponse.ok(res, {totalComments: fileLines.length, ShakerOccurrences: shakerOccurrences, MoverOccurrences: moverOccurrences});
        });
       
    } catch (error) {
        return HttpResponse.badRequest(error)
    }
};

// Get today's reviews and comments
export const viewReport = async (req: Request, res: Response) => {
    try {

        let dateService = new DateService();
        const newdate = dateService.getTodaysDate();
        let content: any;
        var resolvedPath = path.resolve('./src/docs/comments-' + `${newdate}` + '.txt');
        fsPromises.readFile(resolvedPath, 'utf-8').then((reviews: any) => {
            content = reviews;
            // Total number of occurences of "Shaker in the reviews"
            let shakerOccurrences = (content.toLocaleLowerCase().match(/shaker/g) || []).length;
            // Total number of occurences of "Maker in the reviews"
            let moverOccurrences = (content.toLocaleLowerCase().match(/mover/g) || []).length;
            // print reviews on console
            console.log({ Reviews: content, ShakerOccurrences: shakerOccurrences, MoverOccurrences: moverOccurrences });
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

// create a new review and save it in a .txt file under docs directory
export const createReview = async (req: Request, res: Response) => {
    let review = req.body.review;
    if (!review) return HttpResponse.badRequest(res, "Review cannot be empty.");
    let dateService = new DateService();
    const newdate = dateService.getTodaysDate();
    var resolvedPath = path.resolve('./src/docs/comments-' + `${newdate}` + '.txt');
    fsPromises.appendFile(resolvedPath, "\r\n" + review).then((reviews: any) => {
        return HttpResponse.ok(res, "Successfully created a new review.");
    }, error => {
        return HttpResponse.badRequest(res, "Failed to create a new review.");
    });
};