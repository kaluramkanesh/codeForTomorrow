import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { generationToken } from "../utils/jwt";
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email,password)
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password:hashed } });
  return res
    .status(201)
    .json({ status: true, message: "User created successfully", user: user });
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentails" });
    }
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentails" });
    }
    const sessionId = `${Date.now()}_${user.id}`;
    await prisma.user.update({ where: { id: user.id }, data: { sessionId } });
    const token = generationToken(user.id, sessionId);
    res.cookie(token, token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });
    res.status(200).json({ status: true, message: "login successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const logout = async (req: any, res: Response) => {
  try {
    const sessionId = req.sessionId;
    await prisma.user.delete({ where: { id: sessionId } });
    res.clearCookie("token");
    res.status(200).json({ status: true, message: "Logged out" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
