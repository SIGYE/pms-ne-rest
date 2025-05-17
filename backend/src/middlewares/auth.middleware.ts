import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthMiddleware, AuthRequest } from "../types";
import prisma from "../../prisma/prisma-client";
import ServerResponse from "../utils/ServerResponse";

export const checkLoggedIn:any = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return ServerResponse.unauthenticated(res, "You are not logged in");
    }
    if (token.toLowerCase().startsWith("bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    if (!decoded) {
      return ServerResponse.unauthenticated(res, "You are not logged in");
    }

    req.user = { id: (decoded as any).id };
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return ServerResponse.error(res, "Invalid or expired token");
  }
};



export const checkAdmin:any = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;
    console.log("Token:", token);
    console.log("Headers:", req.headers);
    if (!token) {
      return ServerResponse.unauthorized(res, "You are not an admin");
    }

    if (token.toLowerCase().startsWith("bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    const user = await prisma.user.findUnique({
      where: { id: (decoded as any).id },
    });

    if (!user) {
      return ServerResponse.unauthorized(res, "User not found");
    }

    if (user.role !== "ADMIN") {
      return ServerResponse.unauthorized(
        res,
        "You're not allowed to access this resource"
      );
    }

    req.user = { id: user.id };
    next();
  } catch (error) {
    console.error("Admin check error:", error);
    return ServerResponse.error(res, "Internal server error");
  }
};

