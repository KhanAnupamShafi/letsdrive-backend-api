import express from 'express';
import { CarPackageController } from './carPackage.controller';

const router = express.Router();
// dynamic routes - high order
router.patch('/make-available/:id', CarPackageController.makeCarAvailable);
router.post('/get-price/:id', CarPackageController.getCalculatedPrice);
router.get('/available', CarPackageController.retrieveAvailableData);
router.get('/:id', CarPackageController.retrieveOneData);
router.patch('/:id', CarPackageController.updateOneData);
router.delete('/:id', CarPackageController.deleteOneData);

// generic routes - low order
router.post('/create', CarPackageController.createData);
router.get('/', CarPackageController.retrieveManyData);

export const CarPackagesRoutes = router;
