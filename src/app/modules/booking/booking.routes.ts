import express from 'express';
import { bookingController } from './booking.controller';

const router = express.Router();
// dynamic routes - high order
router.patch('/accept/:id', bookingController.acceptBooking);
router.patch('/cancel/:id', bookingController.cancelBooking);
router.get('/:id', bookingController.retrieveOneData);

// generic routes - low order
router.post('/book-car', bookingController.createData);
router.get('/', bookingController.retrieveManyData);

export const bookingRoutes = router;
