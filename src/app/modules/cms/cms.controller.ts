import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncMiddleware from '../../shared/asyncMiddleware';
import sendResponse from '../../shared/sendResponse';
import { CmsService } from './cms.service';

const createData = asyncMiddleware(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await CmsService.createData(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CMS. created successfully',
    data: result,
  });
});

const retrieveOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CmsService.retrieveOneData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CMS. data retrieved successfully',
    data: result,
  });
});

const retrieveFaqs = asyncMiddleware(async (req: Request, res: Response) => {
  const result = await CmsService.retrieveFaqs();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ data retrieved successfully',
    data: result,
  });
});

const updateOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await CmsService.updateOneData(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CMS. updated successfully',
    data: result,
  });
});

const deleteOneData = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CmsService.deleteOneData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CMS. deleted successfully',
    data: result,
  });
});

export const CmsController = {
  createData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
  retrieveFaqs,
};
