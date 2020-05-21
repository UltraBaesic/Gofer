module.exports ={
    defaultServerResponse: {
        status: 400,
        message: '',
        body: {}
    },
    errandMessage: {
        ERRAND_CREATED: 'Errand Created Successfully!',
        ERRAND_FETCHED: 'Errand Fetched Successfully!',
        ERRAND_UPDATED: 'Errand Updated Successfully!',
        ERRAND_DELETED: 'Errand Deleted Successfully!',
        ERRAND_NOT_FOUND: 'Errand Id specified not found',
        ERRAND_RUNNING_OR_COMPLETED: 'Errand is Ongoing or Completed and not available for Bidding',
        BID_SUBMITTED: 'Bid for Errand has been submitted',
        BIDS_FETCHED: 'Bids for Errand Fetched Successfully!',
        BID_DELETED: 'All Bids for Errand deleted successfully'
    },
    userMessage: {
        USER_CREATED: 'User Created Successfully!',
        DUPLICATE_USER: 'User already exist',
        ACTIVATE_USER: 'Activate User Account to Login',
        USER_NOT_FOUND: 'User does not Exist',
        USER_LOGIN: 'User logged on Sucessfully',
        USER_PROFILE_FETCHED: 'User Profile Fetched Successfully!',
        USER_PROFILE_UPDATED: 'User Profile Updated Successfully!',
        USER_PROFILE_DELETED: 'User Profile Deleted Successfully!',
        USER_ACTIVATED: 'User Activated Successfully!',
        INVALID_LOGIN: 'Invalid Password'
    },
    categoryMessage: {
      CATEGORY_CREATED: 'Category Created Successfully!',
      CATEGORY_FETCHED: 'Category Fetched Successfully!',
      CATEGORY_UPDATED: 'Category Updated Successfully!',
      CATEGORY_DELETED: 'Category Deleted Successfully!',
      CATEGORY_NOT_FOUND: 'Category Id specified not found'
    },
    requestValidationMessage: {
        REQUEST_MESSAGE: 'Invalid Fields',
        TOKEN_MISSING: 'Token Missing'
    },
    databaseMessage: {
        INVALID_ID: 'Invalid ID'
    }
}