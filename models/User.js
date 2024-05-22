import { Schema, model } from "mongoose";

import { handleSaveError, setUpdateSettings } from "../models/hooks.js";

import { subsription, emailRegexp } from "../constants/user-constants.js";

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: emailRegexp,
    },
    subscription: {
        type: String,
        enum: subsription,
        default: "starter"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    token: {
        type: String,
        default: null,
    }
}, { versionKey: false, timestamps: true })

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema)

export default User;