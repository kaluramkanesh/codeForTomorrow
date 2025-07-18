import { prisma } from "./../config/prisma";
import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";

export const authenticate = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user || user.sessionId !== decoded.sessionId) {
      return res
        .status(201)
        .json({ status: false, message: "Invalid session" });
    }
    req.user = { id: user.id };
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
};
