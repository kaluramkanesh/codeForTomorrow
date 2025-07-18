import jwt from "jsonwebtoken";
export const generationToken = (userId: string,sessionId:string) => {
  return jwt.sign({userId,sessionId}, process.env.JWT_SECRET as string, {
    expiresIn: 60 * 60 * 1000,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
