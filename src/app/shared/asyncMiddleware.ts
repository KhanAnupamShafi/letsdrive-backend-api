//  this function is designed for handling asynchronous middleware functions in Express.js
import { NextFunction, Request, RequestHandler, Response } from 'express';

const asyncMiddleware =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); // send error to global error handler in app.ts
    }
  };

export default asyncMiddleware;
