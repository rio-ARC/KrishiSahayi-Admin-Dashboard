import { Router } from 'express';
import {
    getIssues,
    getIssueById,
    updateIssueStatus,
    respondToIssue,
    getAnalyticsSummary,
    getAnalyticsTrends
} from '../controllers/adminController.js';

const router = Router();

router.get('/issues', getIssues);
router.get('/issues/:id', getIssueById);
router.patch('/issues/:id/status', updateIssueStatus);
router.patch('/issues/:id/respond', respondToIssue);
router.get('/analytics/summary', getAnalyticsSummary);
router.get('/analytics/trends', getAnalyticsTrends);

export default router;
