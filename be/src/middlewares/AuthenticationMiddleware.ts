import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";

interface ExtendedRequest extends Request {
  user?: {
    userId: string;
    username: string;
    roleId: string;
  };
}

const authenticationMiddleware = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_token"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: No token provided." });
  }

  try {
    const decoded = AuthService.verifyToken(token);
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      roleId: decoded.roleId,
    };

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Invalid token." });
  }
};

export default authenticationMiddleware;
