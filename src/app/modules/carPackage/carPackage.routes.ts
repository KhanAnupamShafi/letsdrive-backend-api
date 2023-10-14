import express from 'express';
import { carPackageController } from './carPackage.controller';

const router = express.Router();
// dynamic routes - high order
router.patch('/make-available/:id', carPackageController.makeCarAvailable);
router.post('/get-price/:id', carPackageController.getCalculatedPrice);
router.get('/:id', carPackageController.retrieveOneData);
router.patch('/:id', carPackageController.updateOneData);
router.delete('/:id', carPackageController.deleteOneData);

// generic routes - low order
router.post('/create', carPackageController.createData);
router.get('/', carPackageController.retrieveManyData);

export const carPackagesRoutes = router;
