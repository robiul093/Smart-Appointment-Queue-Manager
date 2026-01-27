"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const routes_1 = __importDefault(require("./routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Application routes
app.use('/api', routes_1.default);
// Swagger
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '..', 'swagger.yaml')); // Adjust path if needed or move yaml to src
// Actually, let's look for swagger.yaml in project root usually.
// For now, disabling swagger load if file missing or adjust later.
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.send('Smart Appointment & Queue Manager API');
});
app.use(globalErrorHandler_1.globalErrorHandler);
// Not Found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
});
exports.default = app;
