
import express from "express";

import { isEmptyBody } from "../middlewares/isEmptyBody.js";

import validateBody from "../helpers/validateBody.js";

import { authSingUpSchema, authSingInSchema, authVerifyEmailSchema } from "../schemas/authSchemas.js";

import authControllers from "../controllers/authControllers.js"

import authenticate from "../middlewares/authenticate.js"


const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(authSingUpSchema), authControllers.singup);

authRouter.get("/verify/:verificationToken", authControllers.verify);

authRouter.post("/verify", isEmptyBody, validateBody(authVerifyEmailSchema), authControllers.resendVerify)

authRouter.post("/login", isEmptyBody, validateBody(authSingInSchema), authControllers.singin);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.logout);


export default authRouter;