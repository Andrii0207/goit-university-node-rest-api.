import express from "express"

import { isEmptyBody } from "../middlewares/isEmptyBody.js";

import { isValidId } from "../middlewares/isValidId.js";

import authControllers from "../controllers/authControllers.js"

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, authControllers.singup);

authRouter.post("/login", isEmptyBody, authControllers.singin);

export default authRouter;
