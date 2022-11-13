import { Router } from "express";
import { createReview, getTotalNumberOfReviews, viewReport } from "../modules/reports/report";


export const router = Router({
  strict: true,
});

// Resource URLS
router.get('/total-reviews', getTotalNumberOfReviews);
router.post('/view-reviews', viewReport);
router.post('/create-review', createReview);