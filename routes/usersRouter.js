import express from "express";

import authenticate from "../middlewares/authenticate.js"

import handleMulterError from "../helpers/handleMulterValidate.js"

import usersControllers from "../controllers/usersControllers.js"

import validateBody from "../helpers/validateBody.js";

import { updateSubscriptionSchema } from "../schemas/authSchemas.js";

import upload from "../middlewares/upload.js"

const userRouter = express.Router();

const data = upload.single('avatarURL')

userRouter.patch("/", authenticate, validateBody(updateSubscriptionSchema), usersControllers.updateSubscription)

userRouter.patch("/avatars", upload.single("avatarURL"), authenticate, usersControllers.updateAvatar)

export default userRouter;

//handleMulterError(data)