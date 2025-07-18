import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getProfile = async (req: any, res: Response) => {
  try {
    // const user = await prisma.user.findUnique({ where: { id: req.userId } });
    const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          email: true,
          name:true
          // add only the fields you want
        },
      });
    return res.status(200).json({status:true,message:"profile get successfully",user:user})
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
