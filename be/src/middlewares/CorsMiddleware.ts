import cors from "cors";
import helmet from "helmet";
import { Request, Response, NextFunction } from "express";

interface CorsOptions {
    [key: string]: {
        origin: boolean;
        credentials: true,
        methods: string;
        optionsSuccessStatus: number;
    };
}
export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.get("origin");
  const corsOptions: CorsOptions = {
    "https://dobrief.eswe.dev": {
      origin: true,
      methods: "GET,POST,PUT,PATCH,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    },
    "http://localhost:5173": {
      origin: true,
      methods: "GET,POST,PUT,PATCH,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    },
  };

  if (origin && corsOptions[origin]) {
    cors(corsOptions[origin])(req, res, next);
  } else {
    next();
  }
};

export const helmetMiddleware = helmet();
export const frameguardMiddleware = helmet.frameguard({ action: "deny" });
