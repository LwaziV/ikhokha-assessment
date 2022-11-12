import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
@Injectable({
    providedIn: 'root'
})
export class ReportsService {

    // base url using local environment
    private BASE_URL = environment.api;

    constructor(private http: HttpClient) { }

    // gets the total number of comments that currently exists
    getTotalNumberOfComments() {
        return this.http.get(`${this.BASE_URL}/reports/total-comments`);
    }

    // gets the report containing the comments and all reviews
    viewCommentsAndReviewsReport(date: Date) {
        return this.http.post(`${this.BASE_URL}/reports/view-report`, { date });
    }

    createANewReview(words: string) {
        return this.http.post(`${this.BASE_URL}/reports/create-report`, { words });
    }
}