/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes: any[] = [
  {
    path: '/users',
    route: userRoutes,
  },
];

moduleRoutes.forEach(routeInstance => router.use(routeInstance.path, routeInstance.route));
export default router;
