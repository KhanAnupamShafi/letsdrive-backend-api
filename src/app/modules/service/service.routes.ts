import express from 'express';
import { rentServiceController } from './service.controller';

const router = express.Router();
// dynamic routes - high order
router.get('/:id', rentServiceController.retrieveOneData);
router.patch('/:id', rentServiceController.updateOneData);
router.delete('/:id', rentServiceController.deleteOneData);

// generic routes - low order
router.post('/create', rentServiceController.createData);
router.get('/', rentServiceController.retrieveManyData);

export const serviceRoutes = router;
