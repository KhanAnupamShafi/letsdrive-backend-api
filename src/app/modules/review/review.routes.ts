import express from 'express';
import { userController } from './user.controller';

const router = express.Router();
// dynamic routes - high order
router.get('/:id', userController.retrieveOneData);
router.patch('/:id', userController.updateOneData);
router.delete('/:id', userController.deleteOneData);

// generic routes - low order
router.post('/create', userController.createData);
router.get('/', userController.retrieveManyData);

export const userRoutes = router;
