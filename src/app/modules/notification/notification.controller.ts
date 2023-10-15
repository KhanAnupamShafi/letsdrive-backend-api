import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncMiddleware from '../../shared/asyncMiddleware';
import sendResponse from '../../shared/sendResponse';
import { NotificationService } from './notification.service';

const createData = asyncMiddleware(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await NotificationService.createData(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification posted successfully',
    data: result,
  });
});

const updateNotificationStat = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NotificationService.updateNotificationStat(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification status updated successfully',
    data: result,
  });
});

export const NotificationController = { createData, updateNotificationStat };
