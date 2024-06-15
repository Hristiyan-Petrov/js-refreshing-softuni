import User from '../models/User.js';
import bcrypt from "bcrypt";
import config from '../config/config.js';

export default {
    async register({ username, password }) {

        // TO DO: Check if username is available - db.find  // Show User exists

        const salt = await bcrypt.genSalt(config.development.SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);

        const user = new User({ username, password: hash });
        return await user.save();
    },
}