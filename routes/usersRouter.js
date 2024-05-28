import express from "express";

import authenticate from "../middlewares/authenticate.js"

import usersControllers from "../controllers/usersControllers.js"

import validateBody from "../helpers/validateBody.js";

import handleMulterError from "../middlewares/handleMulterValidate.js"

import { updateSubscriptionSchema } from "../schemas/authSchemas.js";

import upload from "../middlewares/upload.js"

const userRouter = express.Router();


userRouter.patch("/", authenticate, validateBody(updateSubscriptionSchema), usersControllers.updateSubscription)

userRouter.patch("/avatars", authenticate, handleMulterError(upload.single("avatarURL")), usersControllers.updateAvatar)

export default userRouter;
