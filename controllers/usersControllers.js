import path from "path";
import fs from "fs/promises"
import Jimp from "jimp";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import usersServices from "../services/usersServices.js"
import HttpError from "../helpers/HttpError.js";
import resizeAvatar from "../helpers/resizeAvatar.js"

const avatarPath = path.resolve("public", "avatars");

const updateSubscription = async (req, res) => {
    const { id } = req.user;
    const { subscription } = req.body;
    const user = await authServices.findUser({ _id: id })

    if (user.subscription === subscription) {
        throw HttpError(409, `You have already subscription: ${subscription}`)
    }
    const updatedUser = await usersServices.updateUser({ _id: id }, req.body);

    res.json({ email: updatedUser.email, subscription: updatedUser.subscription })
}

const updateAvatar = async (req, res) => {
    const { filename, path: oldPath } = req.file;
    const { id } = req.user;
    const newPath = path.join(avatarPath, filename);

    await resizeAvatar(oldPath);

    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("/avatars", filename);

    const updatedUser = await usersServices.updateUser({ _id: id }, { avatarURL });

    res.json({ avatarURL: updatedUser.avatarURL })
}


export default {
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar)
};