/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { CarPackagesRoutes } from '../modules/carPackage/carPackage.routes';
import { CategoryRoutes } from '../modules/cms/category/category.routes';
import { CmsRoutes } from '../modules/cms/cms.routes';
import { NotificationRoutes } from '../modules/notification/notifications.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { ServiceRoutes } from '../modules/service/service.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes: any[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/car-packages',
    route: CarPackagesRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/notifications',
    route: NotificationRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/cms',
    route: CmsRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(routeInstance => router.use(routeInstance.path, routeInstance.route));
export default router;
