import bcrypt from "bcrypt"

import User from "../models/User.js";


const findUser = filter => User.findOne(filter);

const saveUser = async data => {
    const hashPassword = await bcrypt.hash(data.password, 10)
    return User.create({ ...data, password: hashPassword })
};

const updateUser = (filter, data) => User.findByIdAndUpdate(filter, data);


export default {
    findUser,
    saveUser,
    updateUser
}