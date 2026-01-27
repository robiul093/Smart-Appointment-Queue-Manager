import express from 'express';
import { StaffController } from './staff.controller';

const router = express.Router();

router.post('/', StaffController.createStaff);
router.get('/', StaffController.getAllStaff);

export const StaffRoutes = router;
