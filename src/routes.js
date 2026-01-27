"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("./app/modules/auth/auth.route");
const staff_route_1 = require("./app/modules/staff/staff.route");
const service_route_1 = require("./app/modules/services/service.route");
const appointment_route_1 = require("./app/modules/appointments/appointment.route");
const dashboard_route_1 = require("./app/modules/dashboard/dashboard.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/staff',
        route: staff_route_1.StaffRoutes,
    },
    {
        path: '/services',
        route: service_route_1.ServiceRoutes,
    },
    {
        path: '/appointments',
        route: appointment_route_1.AppointmentRoutes,
    },
    {
        path: '/dashboard',
        route: dashboard_route_1.DashboardRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
