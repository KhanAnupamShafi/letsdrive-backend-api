import express from 'express';
import { RentServiceController } from './service.controller';

const router = express.Router();
// dynamic routes - high order
router.get('/:id', RentServiceController.retrieveOneData);
router.patch('/:id', RentServiceController.updateOneData);
router.delete('/:id', RentServiceController.deleteOneData);

// generic routes - low order
router.post('/create', RentServiceController.createData);
router.get('/', RentServiceController.retrieveManyData);

export const ServiceRoutes = router;
