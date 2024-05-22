import express from "express"

import { isEmptyBody } from "../middlewares/isEmptyBody.js";

import { isValidId } from "../middlewares/isValidId.js";

import authControllers from "../controllers/authControllers.js"

import authenticate from "../middlewares/authenticate.js"

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, authControllers.singup);

authRouter.post("/login", isEmptyBody, authControllers.singin);

authRouter.get("/current", authenticate, authControllers.getCurrent)

authRouter.post("/singout", authenticate, authControllers.singout)

export default authRouter;
