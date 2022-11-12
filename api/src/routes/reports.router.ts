import { Router } from "express";
import { getTotalNumberOfReviews, viewReport }  from "../modules/reports/report";


export const router = Router({
    strict: true,
  });
  
  // REFACTOR RESOURCE URLS
  //get any NFT sequentially older than the given ID
  router.get('/total-comments', getTotalNumberOfReviews);
  router.post('/view-report', viewReport);