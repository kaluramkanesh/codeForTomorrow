import { Router } from "express";
import { getProfile } from "../controller/user.profile.controller";
import { authenticate } from "../middlewares/auth";

const userRouter = Router();
userRouter.get("/get/profile", authenticate, getProfile);
export default userRouter;
