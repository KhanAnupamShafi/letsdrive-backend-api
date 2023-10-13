/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { adminRoutes } from '../modules/admin/admin.routes';
import { carPackagesRoutes } from '../modules/carPackage/carPackage.routes';
import { serviceRoutes } from '../modules/service/service.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes: any[] = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
  {
    path: '/services',
    route: serviceRoutes,
  },
  {
    path: '/car-packages',
    route: carPackagesRoutes,
  },
];

moduleRoutes.forEach(routeInstance => router.use(routeInstance.path, routeInstance.route));
export default router;
