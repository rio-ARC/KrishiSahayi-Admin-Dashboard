import { Router } from 'express';
import { createIssue, getFarmerIssues, getFarmerIssueById } from '../controllers/farmerController.js';

const router = Router();

router.post('/:farmerId/issues', createIssue);
router.get('/:farmerId/issues', getFarmerIssues);
router.get('/:farmerId/issues/:id', getFarmerIssueById);

export default router;
