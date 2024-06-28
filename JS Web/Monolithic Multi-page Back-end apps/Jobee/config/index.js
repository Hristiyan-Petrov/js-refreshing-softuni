const MONGO_DB_NAME = 'jobee';

module.exports = {
    PORT: 3000,
    DB_URI: `mongodb://127.0.0.1:27017/${MONGO_DB_NAME}`,
    SALT_ROUNDS: 10,
    SECRET: 'navuhodonosorEgotin',
    AUTH_COOKIE_NAME: 'token',
    errors: {
        PASSWORDS_DO_NOT_MATCH: { message: 'Passwords do not match', status: 400 },
        INVALID_USER_OR_PASSWORD: { message: 'Invalid user or password', status: 404 },
        AUTHORIZATION: { message: 'You do not have the rigths for this page', status: 401 },
    },
    mongooseValidationMessages: {
        auth: {
            INVALID_EMAIL_FORMAT: 'Invalid email format. Expected format: name@domain.extension',
            TAKEN_USERNAME: 'Username is taken',
            STRONG_PASSWORD: 'Password should have at least 8 characters, one lowercase character, one uppercase character, and one digit.'
        },
        ad: {
            REQUIRED: 'Please enter ',
            MINLENGTH: ' must be longer than that.'
        }
    },
};