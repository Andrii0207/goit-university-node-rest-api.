import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import authServices from "../services/authServices.js"
import compareHash from "../helpers/compareHash.js"
import { createToken } from "../helpers/jwt.js";
import gravatar from "gravatar";
import { nanoid } from "nanoid"
import sendEmail from "../helpers/sendEmail.js";


const singup = async (req, res) => {
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }
    const avatarURL = gravatar.url(email, { s: '250' });
    const verificationToken = nanoid();

    const newUser = await authServices.saveUser({ ...req.body, avatarURL, verificationToken });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Click verify email</a>`,
    };
    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
    })
}


const verify = async (req, res) => {
    const { verificationToken } = req.params;

    const user = await authServices.findUser({ verificationToken });
    if (!user) {
        throw HttpError(404, "User not found");
    }
    await authServices.updateUser({ _id: user._id }, { verify: true, verificationToken: null });

    res.json({
        message: "Verification successful"
    })
}


const resendVerify = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw HttpError(400, "Missing required field email");
    }

    const user = authServices.findUser({ email });
    if (!user) {
        throw HttpError(404, "Email not found");
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="http://localhost:3000/users/verify/${user.verificationToken}">Click verify email</a>`,
    };
    await sendEmail(verifyEmail);
    res.json({ message: "Verification email sent" });
}


const singin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    if (!user.verify) {
        throw HttpError(401, "Email not verify");
    }
    const comparePassword = await compareHash(password, user.password);
    if (!comparePassword) {
        throw HttpError(401, "Email or password is wrong");
    }
    const { _id: id } = user;
    const payload = { id, };
    const token = createToken(payload);

    await authServices.updateUser({ _id: id }, { token });

    res.json({ token, user: { email, subsription: user.subscription } });
}


const logout = async (req, res) => {
    const { _id } = req.user;
    await authServices.updateUser({ _id }, { token: "" });
    res.status(204).json({})
}


const getCurrent = (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
}


export default {
    singup: ctrlWrapper(singup),
    verify: ctrlWrapper(verify),
    resendVerify: ctrlWrapper(resendVerify),
    singin: ctrlWrapper(singin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}