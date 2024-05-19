import * as authServises from "../services/contactsServices.js"

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

import authServices from "../services/authServices.js"


const singup = async (req, res) => {
    const newUser = await authServices.saveUser(req.body)

    console.log(newUser)

    res.status(201).json({
        email: newUser.email,
        password: newUser.password,
        subscription: newUser.subscription
    })
}

export default {
    singup: ctrlWrapper(singup),
}
