import express from 'express';
import { ReviewController } from './review.controller';

const router = express.Router();
// dynamic routes - high order
router.get('/:id', ReviewController.retrieveOneData);
router.patch('/:id', ReviewController.updateOneData);
router.delete('/:id', ReviewController.deleteOneData);

// generic routes - low order
router.post('/post-review', ReviewController.createData);
router.get('/', ReviewController.retrieveManyData);

export const ReviewRoutes = router;
