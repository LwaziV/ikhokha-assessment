import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';
import { MessageHandlerService } from '../services/message.service';
import { ReportsService } from './../services/reports.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageHandlerService, DateService]
})
export class HomeComponent implements OnInit {
  totalReviews: number = 0;
  moverReviews: number = 0;
  shakerReviews: number = 0;
  report: any;
  reviewComment: string;
  constructor(private reportService: ReportsService, 
    private messageService: MessageHandlerService, private dateService: DateService) { }

  ngOnInit(): void {
    this.getTotalNumberOfComments();
  }

  // get total number of reviews in the latest file
  getTotalNumberOfComments() {
    this.reportService.getTotalNumberOfReviews()
      .subscribe((res: any) => {
        this.totalReviews = res.totalComments;
        this.moverReviews = res.MoverOccurrences;
        this.shakerReviews = res.ShakerOccurrences;
      }, error => {
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
        const newdate = this.dateService.getTodaysDate();
        link.setAttribute('download', 'comments-' + `${newdate}` + '.txt');
        document.body.appendChild(link);
        link.click()
      }, error => {
        this.messageService.displayMessage("Failed to get reviews");
      });
  }

  // Checks if comment meets conditions before trying to create a review
  checkReviewCondition(review: string) {
    if (!this.reviewComment) {
      this.messageService.displayMessage("Review does not meet our requirements!");
    } else {
      review = this.reviewComment.toLocaleLowerCase();
      if (review.length < 15) {
        this.createReview(review);
      } else if (review.includes("mover") || review.includes("shaker")) {
        this.createReview(review);
      } else {
        this.messageService.displayMessage("Review does not meet our requirements!");
      }
    }

  }

  // send review to the backend and store it in today's review document
  createReview(review: string) {
    review = this.reviewComment;
    this.reportService.createANewReview(review)
      .subscribe((res: any) => {
        this.messageService.displayMessage(res);
        this.reviewComment = "";
        this.getTotalNumberOfComments();
      }, (err) => {
        console.log(err);
        this.messageService.displayMessage("Failed to create a review");
      });
  }
}
