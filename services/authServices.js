import User from "../models/User.js";

const saveUser = data => User.create(data);



export default {
    saveUser
}