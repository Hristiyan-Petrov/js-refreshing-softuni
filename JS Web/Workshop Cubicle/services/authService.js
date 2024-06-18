import User from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from '../config/config.js';

export default {
    async register({ username, password, repeatPassword }) {

        let isUsernameAvailable = !await User.findOne({ username });
        if (!isUsernameAvailable) throw { message: 'Username is taken!' };

        if (password !== repeatPassword) throw { message: 'Passwords must match!' }

        const salt = await bcrypt.genSalt(config.development.SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);

        const user = new User({ username, password: hash });
        return await user.save();
    },

    async login({ username, password }) {

        // get user from db
        // let user = await User.findOne({ username });
        // if (!user) throw { message: 'User not found!' };

        // compare password hash
        // let isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) throw { message: 'Password is wrong!' };

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