import express from 'express';
import { adminController } from './admin.controller';

const router = express.Router();
// dynamic routes - high order
router.get('/:id', adminController.retrieveOneData);
router.patch('/:id', adminController.updateOneData);
router.delete('/:id', adminController.deleteOneData);

// generic routes - low order
router.post('/create', adminController.createData);
router.get('/', adminController.retrieveManyData);

export const adminRoutes = router;
