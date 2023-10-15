import express from 'express';
import { BookingController } from './booking.controller';

const router = express.Router();
// dynamic routes - high order
router.patch('/accept/:id', BookingController.acceptBooking);
router.patch('/cancel/:id', BookingController.cancelBooking);
router.get('/:id', BookingController.retrieveOneData);

// generic routes - low order
router.post('/book-car', BookingController.createData);
router.get('/', BookingController.retrieveManyData);

export const BookingRoutes = router;
