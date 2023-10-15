import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncMiddleware from '../../shared/asyncMiddleware';
import pick from '../../shared/pick';
import sendResponse from '../../shared/sendResponse';
import { filterableFields } from './admin.constants';
import { AdminService } from './admin.services';

const createData = asyncMiddleware(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AdminService.createData(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const retrieveManyData = asyncMiddleware(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AdminService.retrieveManyData(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const retrieveOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.retrieveOneData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  });
});

const updateOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await AdminService.updateOneData(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.deleteOneData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});

export const AdminController = {
  createData,
  retrieveManyData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
};
