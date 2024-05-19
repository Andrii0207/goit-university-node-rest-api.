import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import authServices from "../services/authServices.js"
import compareHash from "../helpers/compareHash.js"
import { createToken } from "../helpers/jwt.js";


const singup = async (req, res) => {
    const { email } = req.body;

    const user = await authServices.findUser({ email })
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const newUser = await authServices.saveUser(req.body);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription
    })
}

const singin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }
    const comparePassword = await compareHash(password, user.password)
    if (!comparePassword) {
        throw HttpError(401, "Email or password is wrong")
    }
    const { _id: id } = user;
    const payload = { id, };
    const token = createToken(payload);

    res.json({ token })
}

export default {
    singup: ctrlWrapper(singup),
    singin: ctrlWrapper(singin)
}
