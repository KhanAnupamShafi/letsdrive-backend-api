import express from 'express';
import { CmsController } from './cms.controller';

const router = express.Router();

// Specific routes
router.get('/faqs', CmsController.retrieveFaqs);

// dynamic routes
router.get('/:id', CmsController.retrieveOneData);
router.patch('/:id', CmsController.updateOneData);
router.delete('/:id', CmsController.deleteOneData);

// generic routes
router.post('/create', CmsController.createData);

export const CmsRoutes = router;
