import Joi from "joi";

import { emailRegexp, typeOfSubscription } from "../constants/user-constants.js"

export const authSingUpSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
    subscription: Joi.string().valid(...typeOfSubscription)
});

export const authSingInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required()
})

export const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...typeOfSubscription).required()
})