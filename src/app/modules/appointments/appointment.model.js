"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = require("mongoose");
const appointmentSchema = new mongoose_1.Schema({
    customerName: { type: String, required: true },
    serviceId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Service', required: true },
    staffId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Staff', default: null },
    date: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled', 'No-Show', 'Pending'],
        default: 'Scheduled',
    },
    queuePosition: { type: Number, default: 0 },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Appointment = (0, mongoose_1.model)('Appointment', appointmentSchema);
