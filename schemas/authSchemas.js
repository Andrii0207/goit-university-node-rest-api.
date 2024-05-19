import Joi, { required } from "joi";

import { emailRegexp } from "../constants/user-constants.js"

export const authSingUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().pattern(emailRegexp).min(6).required()
});

export const authSingInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
})