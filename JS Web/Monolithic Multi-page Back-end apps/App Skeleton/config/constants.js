module.exports = {
    errors: {
        PASSWORDS_DO_NOT_MATCH: { message: 'Passwords do not match', status: 400 },
        INVALID_USER_OR_PASSWORD: { message: 'Invalid user or password', status: 404 }
    },
    mongooseValidationMessages: {
        TAKEN_USERNAME: 'Username is taken'
    }
}