"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
// import validateRequest from "../../middlewares/validateRequest";
// import { loginValidationSchema, registerValidationSchema } from "./auth.validation";
const router = express_1.default.Router();
router.post("/register", 
// validateRequest(registerValidationSchema),
auth_controller_1.AuthController.register);
router.post("/login", 
// validateRequest(loginValidationSchema),
auth_controller_1.AuthController.login);
exports.AuthRoutes = router;
