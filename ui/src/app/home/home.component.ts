import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateService } from '../services/date.service';
import { ReportsService } from './../services/reports.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalReviews: number = 0;
  moverReviews: number = 0;
  shakerReviews: number = 0;
  report: any;
  reviewComment: string;
  constructor(private reportService: ReportsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTotalNumberOfComments();
  }

  // get total number of reviews
  getTotalNumberOfComments() {
    debugger;
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
        this.report = res.Reviews;
        const url = window.URL.createObjectURL(new Blob([this.report]));
        const link = document.createElement('a');
        link.href = url;
        let dateService = new DateService();
        const newdate = dateService.getTodaysDate();
        link.setAttribute('download', 'comments-' + `${newdate}` + '.txt');
        document.body.appendChild(link);
        link.click()
      }, error => {
        this.snackBar.open("Failed to get reviews", '', {
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["custom-toast-style"]
        });
      });
  }

  // Checks if comment meets conditions before trying to create a review
  checkReviewCondition(review: string) {
    if (!review) {
      this.snackBar.open("Review does not meet our requirements!", '', {
        verticalPosition: "bottom",
        horizontalPosition: "center",
        panelClass: ["custom-toast-style"]
      });
    }
    review = this.reviewComment.toLocaleLowerCase();
    if (review.length < 15) {
      this.createReview(review);
    } else if (review.includes("mover") || review.includes("shaker")) {
      this.createReview(review);
    } else {
      this.snackBar.open("Review does not meet our requirements!", '', {
        verticalPosition: "bottom",
        horizontalPosition: "center",
        panelClass: ["custom-toast-style"]
      });
    }
  }

  // send review to the backend and store it in today's review document
  createReview(review: string) {
    review = this.reviewComment;
    this.reportService.createANewReview(review)
      .subscribe((res: any) => {
        this.snackBar.open(res, '', {
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["custom-toast-style"]
        });
        this.reviewComment = "";
        this.getTotalNumberOfComments();
      }, (err) => {
        this.snackBar.open("Failed to create a review", '', {
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["custom-toast-style"]
        });
      })
  }
}
