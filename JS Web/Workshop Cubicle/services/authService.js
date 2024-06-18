import User from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from '../config/config.js';

export default {
    async register({ username, password }) {

        // const salt = await bcrypt.genSalt(config.development.SALT_ROUNDS);
        // const hash = await bcrypt.hash(password, salt);

        const user = new User({ username, password });
        return await user.save();
    },

    async login({ username, password }) {
        // generate token

        // not good idea to put all info in the token
        // it contains sensitive data, available on client
        // must be compact also
        // best practice to put minimal data in it

        const user = await User.findOne({ username });
        const token = jwt.sign({ _id: user._id, roles: ['admin'] }, config.development.SECRET_KEY);
        return token;
    }
}