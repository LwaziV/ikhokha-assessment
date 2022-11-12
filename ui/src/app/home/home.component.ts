import { Component, OnInit } from '@angular/core';
import { ReportsService } from './../services/reports.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalReviews: number = 0;
  report: any;
  constructor(private reportService: ReportsService) { }

  ngOnInit(): void {
    this.getTotalNumberOfComments();
  }

  // get total number of reviews
  getTotalNumberOfComments() {
    this.reportService.getTotalNumberOfComments()
      .subscribe((res: any) => {
        this.totalReviews = res;
      }, error => {
        console.log("Failed to get total number of comments", error);
        this.totalReviews = 0;
      });
  }
  // Get all reviews for today's date
  getCommentsAndReviewsReport() {
    const todaysDate = new Date();
    this.reportService.viewCommentsAndReviewsReport(todaysDate)
      .subscribe((res: any) => {
        this.report = res;
        const url = window.URL.createObjectURL(new Blob([this.report]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'comments.txt');
        document.body.appendChild(link);
        link.click()
      }, error => {
        console.log("Failed to get report", error);
      });
  }

  // Checks if comment meets conditions before trying to create a review
  checkReviewCondition(words: string) {
    words = this.report;
    if (words.length < 15) {
      this.createReview(words);
    } else if (words.toLocaleLowerCase().includes("Mover")) {
      this.createReview(words);
    } else if (words.toLocaleLowerCase().includes("Shaker")) {
      this.createReview(words);
    }
  }

  // send review to the backend and store it in today's review document
  createReview(words: string) {
    words = this.report;
    this.reportService.createANewReview(words)
      .subscribe((res: any) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      })
  }
}
