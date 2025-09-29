import express from "express";
import { register, requestOtp, verifyOtp } from "../controllers/user.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/request-otp", requestOtp);
authRouter.post("/verify-otp", verifyOtp);

export default authRouter;
