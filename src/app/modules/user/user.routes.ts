import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
// dynamic routes - high order
router.get('/:id', UserController.retrieveOneData);
router.patch('/:id', UserController.updateOneData);
router.delete('/:id', UserController.deleteOneData);

// generic routes - low order
router.post('/create', UserController.createData);
router.get('/', UserController.retrieveManyData);

export const UserRoutes = router;
