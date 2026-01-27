import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import path from "path";

const app: Application = express();

app.use(express.json());
app.use(cors());

const allowedOrigins = [
  "http://localhost:5173",
  "https://magnificent-pixie-4bbb12.netlify.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // only if you use cookies/auth headers
  }),
);

// Application routes
app.use("/api", router);

// Swagger
const swaggerDocument = yaml.load(path.join(__dirname, "..", "swagger.yaml")); // Adjust path if needed or move yaml to src
// Actually, let's look for swagger.yaml in project root usually.
// For now, disabling swagger load if file missing or adjust later.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
  res.send("Smart Appointment & Queue Manager API");
});

app.use(globalErrorHandler);

// Not Found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
});

export default app;
