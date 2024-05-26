import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import authServices from "../services/authServices.js"
import compareHash from "../helpers/compareHash.js"
import { createToken } from "../helpers/jwt.js";
import gravatar from "gravatar";


const singup = async (req, res) => {
    const { email } = req.body;
    const user = await authServices.findUser({ email })
    if (user) {
        throw HttpError(409, "Email in use")
    }
    const avatarURL = gravatar.url(email, { s: '250' })

    const newUser = await authServices.saveUser({ ...req.body, avatarURL });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
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
    await authServices.updateUser({ _id: id }, { token })

    res.json({ token, user: { email, subsription: user.subscription } })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await authServices.updateUser({ _id }, { token: "" })
    res.status(204).json({})
}

const getCurrent = (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription })
}

export default {
    singup: ctrlWrapper(singup),
    singin: ctrlWrapper(singin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout)
}