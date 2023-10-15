import express from 'express';
import { NotificationController } from './notification.controller';

const router = express.Router();
// dynamic routes - high order
// router.patch('/make-available/:id', carPackageController.makeCarAvailable);
// router.post('/get-price/:id', carPackageController.getCalculatedPrice);
// router.get('/:id', carPackageController.retrieveOneData);
router.patch('/:id', NotificationController.updateNotificationStat);
// router.delete('/:id', carPackageController.deleteOneData);

// generic routes - low order
router.post('/create', NotificationController.createData);
// router.get('/', carPackageController.retrieveManyData);

export const NotificationRoutes = router;
