"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const appointment_controller_1 = require("./appointment.controller");
const router = express_1.default.Router();
router.post('/', appointment_controller_1.AppointmentController.createAppointment);
router.get('/', appointment_controller_1.AppointmentController.getAllAppointments);
exports.AppointmentRoutes = router;
