import express from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();
// dynamic routes - high order
router.get('/:id', AdminController.retrieveOneData);
router.patch('/:id', AdminController.updateOneData);
router.delete('/:id', AdminController.deleteOneData);

// generic routes - low order
router.post('/create', AdminController.createData);
router.get('/', AdminController.retrieveManyData);

export const AdminRoutes = router;
