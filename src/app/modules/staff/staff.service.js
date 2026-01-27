"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const staff_model_1 = require("./staff.model");
const createStaff = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield staff_model_1.Staff.create(payload);
    return result;
});
const getAllStaff = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield staff_model_1.Staff.find();
    return result;
});
exports.StaffService = {
    createStaff,
    getAllStaff,
};
