import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncMiddleware from '../../../shared/asyncMiddleware';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const createData = asyncMiddleware(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await CategoryService.createData(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Content Category created successfully',
    data: result,
  });
});

const retrieveManyData = asyncMiddleware(async (req: Request, res: Response) => {
  const result = await CategoryService.retrieveManyData();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Catagories retrieved successfully',
    data: result,
  });
});

const retrieveOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.retrieveOneData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});

const updateOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await CategoryService.updateOneData(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.deleteOneData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const CategoryController = {
  createData,
  retrieveManyData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
};
