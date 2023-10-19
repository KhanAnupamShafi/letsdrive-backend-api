import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncMiddleware from '../../shared/asyncMiddleware';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { filterableFields } from './carPackage.constants';
import { CarPackageService } from './carPackage.services';

const createData = asyncMiddleware(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await CarPackageService.createData(data);
  // console.log(data, ' successfully');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Package created successfully',
    data: result,
  });
});

const retrieveManyData = asyncMiddleware(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await CarPackageService.retrieveManyData(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Packages retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const retrieveOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CarPackageService.retrieveOneData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Package retrieved successfully',
    data: result,
  });
});

const updateOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await CarPackageService.updateOneData(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Package updated successfully',
    data: result,
  });
});

const deleteOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CarPackageService.deleteOneData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Package deleted successfully',
    data: result,
  });
});

const makeCarAvailable = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CarPackageService.makeCarAvailable(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Package is now available',
    data: result,
  });
});
const getCalculatedPrice = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CarPackageService.getCalculatedPrice(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Package price obtained',
    data: result,
  });
});

type BookQuery = {
  serviceType: string;
  bookingDate: string; // Note that we're keeping this as a string
};
const retrieveAvailableData = asyncMiddleware(async (req: Request, res: Response) => {
  const { serviceType, bookingDate } = req.query as BookQuery;

  const result = await CarPackageService.retrieveAvailableData(serviceType, bookingDate);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Package  obtained',
    data: result,
  });
});

export const CarPackageController = {
  createData,
  retrieveManyData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
  makeCarAvailable,
  getCalculatedPrice,
  retrieveAvailableData,
};
