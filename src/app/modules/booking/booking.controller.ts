import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncMiddleware from '../../shared/asyncMiddleware';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { filterableFields } from './booking.constants';
import { BookingService } from './booking.services';

const createData = asyncMiddleware(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await BookingService.createData(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking data created successfully',
    data: result,
  });
});
const acceptBooking = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.acceptBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is successfully accepted',
    data: result,
  });
});
const cancelBooking = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.cancelBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is successfully cancelled',
    data: result,
  });
});

const retrieveManyData = asyncMiddleware(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableFields);
  console.log(filters, 'as');
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await BookingService.retrieveManyData(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking data retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const retrieveOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.retrieveOneData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking data retrieved successfully',
    data: result,
  });
});

// const updateOneData = asyncMiddleware(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const data = req.body;
//   const result = await bookingService.updateOneData(id, data);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Booking data updated successfully',
//     data: result,
//   });
// });

// const deleteOneData = asyncMiddleware(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await bookingService.deleteOneData(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Booking data deleted successfully',
//     data: result,
//   });
// });

export const BookingController = {
  createData,
  acceptBooking,
  cancelBooking,
  retrieveManyData,
  retrieveOneData,
  // updateOneData,
  // deleteOneData,
};
