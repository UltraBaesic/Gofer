module.exports ={
    defaultServerResponse: {
        status: 400,
        message: '',
        body: {}
    },
    userMessage: {
        USER_CREATED: 'User Created Successfully!',
        DUPLICATE_USER: 'User already exist',
        USER_NOT_FOUND: 'User does not Exist',
        USER_LOGIN: 'User logged on Sucessfully',
        USER_PROFILE_FETCHED: 'User Profile Fetched Successfully!',
        USER_PROFILE_UPDATED: 'User Profile Updated Successfully!',
        USER_PROFILE_DELETED: 'User Profile Deleted Successfully!',
        INVALID_LOGIN: 'Invalid Password'
    },
    requestValidationMessage: {
        REQUEST_MESSAGE: 'Invalid Fields',
        TOKEN_MISSING: 'Token Missing'
    },
    databaseMessage: {
        INVALID_ID: 'Invalid ID'
    }
}