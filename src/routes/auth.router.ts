import { Router } from "express";
import { register, login, logout } from "../controller/auth.controller";
import { authenticate } from "../middlewares/auth";
const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authenticate, logout);
export default authRouter;
