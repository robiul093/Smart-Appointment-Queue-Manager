import express from 'express';
import { AuthRoutes } from './app/modules/auth/auth.route';
import { StaffRoutes } from './app/modules/staff/staff.route';
import { ServiceRoutes } from './app/modules/services/service.route';
import { AppointmentRoutes } from './app/modules/appointments/appointment.route';
import { DashboardRoutes } from './app/modules/dashboard/dashboard.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/staff',
    route: StaffRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/appointments',
    route: AppointmentRoutes,
  },
  {
    path: '/dashboard',
    route: DashboardRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
