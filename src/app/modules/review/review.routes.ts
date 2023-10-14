import express from 'express';
import { reviewController } from './review.controller';

const router = express.Router();
// dynamic routes - high order
router.get('/:id', reviewController.retrieveOneData);
router.patch('/:id', reviewController.updateOneData);
router.delete('/:id', reviewController.deleteOneData);

// generic routes - low order
router.post('/post-review', reviewController.createData);
router.get('/', reviewController.retrieveManyData);

export const reviewRoutes = router;
