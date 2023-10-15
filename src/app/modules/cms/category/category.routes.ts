import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();
// dynamic routes - high order
router.get('/:id', CategoryController.retrieveOneData);
router.patch('/:id', CategoryController.updateOneData);
router.delete('/:id', CategoryController.deleteOneData);

// generic routes - low order
router.post('/create', CategoryController.createData);
router.get('/', CategoryController.retrieveManyData);

export const CategoryRoutes = router;
