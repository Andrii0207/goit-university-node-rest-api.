import User from "../models/User.js";

const updateUser = (filter, data) => User.findByIdAndUpdate(filter, data);


export default {
    updateUser
}