
import { Router } from "express";
import { router as commonRouter } from "./common.router";
import { router as ReportsRouter } from './reports.router';
const router = Router()

// ROUTES
router.use('/reports', ReportsRouter);
// This has to be the last route
// This router is responsible for all errors and routes that are not found
router.use(commonRouter)

export default router