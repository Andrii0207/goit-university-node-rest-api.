import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import authServices from "../services/authServices.js"
import compareHash from "../helpers/compareHash.js"
import { createToken } from "../helpers/jwt.js";
import { authSingUpSchema } from "../schemas/authSchemas.js"


const singup = async (req, res) => {
    const { email, subscription } = req.body;

    const user = await authServices.findUser({ email })
    if (user) {
        throw HttpError(409, "Email in use")
    }
    const { error } = authSingUpSchema.validate(req.body)
    if (error) {
        throw HttpError(400, error.message)
    }
    const newUser = await authServices.saveUser(req.body);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
    })
}

const singin = async (req, res) => {
    const { email, password, subsription } = req.body;
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

const getCurrent = (req, res) => {
    const { email } = req.user;
    req.json({ email })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await authServices.updateUser({ _id }, { token: "" })
    res.json({ message: "Logout success" })
}

export default {
    singup: ctrlWrapper(singup),
    singin: ctrlWrapper(singin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout)
}
