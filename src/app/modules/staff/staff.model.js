"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const mongoose_1 = require("mongoose");
const staffSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    serviceType: { type: String, required: true },
    dailyCapacity: { type: Number, default: 5 },
    availabilityStatus: {
        type: String,
        enum: ['Available', 'On Leave'],
        default: 'Available',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Staff = (0, mongoose_1.model)('Staff', staffSchema);
