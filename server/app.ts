import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import httpStatus from "http-status";
import config from "./config";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import { globalErrorhandler } from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send(`Lms server running on PORT ${config.port}`);
});

// middleware
app.use(globalErrorhandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
