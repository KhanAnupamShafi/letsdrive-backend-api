import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncMiddleware from '../../shared/asyncMiddleware';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { filterableFields } from './review.constants';
import { reviewService } from './review.services';

const createData = asyncMiddleware(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await reviewService.createData(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const retrieveManyData = asyncMiddleware(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await reviewService.retrieveManyData(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const retrieveOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.retrieveOneData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    data: result,
  });
});

const updateOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await reviewService.updateOneData(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const deleteOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.deleteOneData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const reviewController = {
  createData,
  retrieveManyData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
};
