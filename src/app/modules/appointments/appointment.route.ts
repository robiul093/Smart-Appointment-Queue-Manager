import express from 'express';
import { AppointmentController } from './appointment.controller';

const router = express.Router();

router.post('/', AppointmentController.createAppointment);
router.get('/', AppointmentController.getAllAppointments);

export const AppointmentRoutes = router;
