'use strict';

const constants = require('app/api/common/constants/constants.service').constants,
  httpStatus = constants.httpStatus,
  responses = {
    AUTHORIZATION_BAD_TOKEN: { code: httpStatus.BAD_REQUEST, payload: 'Bad security token' },
    AUTHORIZATION_NOT_LOGGED_IN: { code: httpStatus.UNAUTHORIZED, payload: 'You must be logged in to see that' },
    AUTHORIZATION_FORBIDDEN: { code: httpStatus.FORBIDDEN, payload: 'You are not allowed to see this' },
    UNKNOWN_SERVER_ERROR: { code: httpStatus.INTERNAL_SERVER_ERROR, payload: 'Something failed' },
    LOGIN_INVALID_DETAILS: { code: httpStatus.BAD_REQUEST, payload: 'Invalid login details' },
    LOGIN_INVALID_EMAIL: { code: httpStatus.BAD_REQUEST, payload: 'Invalid email provided' },
    LOGIN_NO_PASSWORD: { code: httpStatus.BAD_REQUEST, payload: 'No password provided' },
    LOGIN_NO_USER_FOUND: { code: httpStatus.NOT_FOUND, payload: 'No user found' },
    LOGIN_USER_NOT_CONFIRMED: { code: httpStatus.BAD_REQUEST, payload: 'User not confirmed' },
    LOGIN_USER_DISABLED: { code: httpStatus.BAD_REQUEST, payload: 'User is disabled, contact administrator' },
    CONFIRMATION_USER_NOT_FOUND: { code: httpStatus.NOT_FOUND, payload: 'User not confirmed' },
    CONFIRMATION_USER_ALREADY_CONFIRMED: { code: httpStatus.OK, payload: 'User already confirmed' },
    CONFIRMATION_USER_CONFIRMED: { code: httpStatus.OK, payload: 'User confirmed' },
    REGISTRATION_NO_CONFIRMATION_TOKEN: { code: httpStatus.BAD_REQUEST, payload: 'No confirmation token provided' },
    REGISTRATION_INVALID_DETAILS: { code: httpStatus.BAD_REQUEST, payload: 'Invalid registration details' },
    REGISTRATION_INVALID_FIRST_NAME: { code: httpStatus.BAD_REQUEST, payload: 'Invalid first name' },
    REGISTRATION_INVALID_LAST_NAME: { code: httpStatus.BAD_REQUEST, payload: 'Invalid last name' },
    REGISTRATION_INVALID_ROLE_ID: { code: httpStatus.BAD_REQUEST, payload: 'Invalid role id' },
    REGISTRATION_CANNOT_BE_ADMINISTRATOR: { code: httpStatus.BAD_REQUEST, payload: 'You cannot register to be administrator' },
    REGISTRATION_INVALID_EMAIL: { code: httpStatus.BAD_REQUEST, payload: 'Invalid email' },
    REGISTRATION_NO_PASSWORD: { code: httpStatus.BAD_REQUEST, payload: 'No password provided' },
    REGISTRATION_FAILED_USER_ALREADY_REGISTERED: { code: httpStatus.CONFLICT, payload: 'User already registered' },
    REGISTRATION_FAILED_NO_SUCH_ROLE: { code: httpStatus.BAD_REQUEST, payload: 'No such role' },
    REGISTRATION_SUCCESSFUL: { code: httpStatus.CREATED, payload: 'Registration is successful' },
    USERS_INVALID_ID: { code: httpStatus.BAD_REQUEST, payload: 'Invalid user ID provided' },
    USERS_CANNOT_DELETE_YOURSELF: { code: httpStatus.BAD_REQUEST, payload: 'Cannot delete yourself' },
    USERS_DELETE_SUCCESSFUL: { code: httpStatus.OK, payload: 'Successful deletion' },
    USERS_DELETE_UNSUCCESSFUL: { code: httpStatus.NOT_FOUND, payload: 'Nothing deleted. The user might be already deleted' },
    LOCATION_NOT_FOUND: { code: httpStatus.NOT_FOUND, payload: 'No location found' },
    LOCATION_NO_SEARCH_PROVIDED: { code: httpStatus.BAD_REQUEST, payload: 'No search query' },
    LOCATION_GEOCODER_ERROR: { code: httpStatus.INTERNAL_SERVER_ERROR, payload: 'Error fetching data from geocoder' },
    USERS_INVALID_QUERY: { code: httpStatus.BAD_REQUEST, payload: 'Invalid query' },
    USERS_INVALID_DETAILS: { code: httpStatus.BAD_REQUEST, payload: 'Invalid user details' },
    USERS_INVALID_FIRST_NAME: { code: httpStatus.BAD_REQUEST, payload: 'Invalid first name' },
    USERS_INVALID_LAST_NAME: { code: httpStatus.BAD_REQUEST, payload: 'Invalid last name' },
    USERS_INVALID_ROLE_ID: { code: httpStatus.BAD_REQUEST, payload: 'Invalid role id' },
    USERS_CANNOT_BE_ADMINISTRATOR: { code: httpStatus.BAD_REQUEST, payload: 'You cannot register to be administrator' },
    USERS_INVALID_EMAIL: { code: httpStatus.BAD_REQUEST, payload: 'Invalid email' },
    USERS_NO_PASSWORD: { code: httpStatus.BAD_REQUEST, payload: 'No password provided' },
    USERS_FAILED_USER_ALREADY_REGISTERED: { code: httpStatus.CONFLICT, payload: 'User already registered' },
    USERS_FAILED_USER_EXISTS: { code: httpStatus.CONFLICT, payload: 'User with such details exists' },
    USERS_FAILED_NO_SUCH_ROLE: { code: httpStatus.BAD_REQUEST, payload: 'No such role' },
    USERS_SUCCESSFUL: { code: httpStatus.CREATED, payload: 'User created successfully' },
    USERS_INVITATION_SUCCESSFUL: { code: httpStatus.CREATED, payload: 'User invited successfully' },
    USERS_INVITATION_ALREADY_INVITED: { code: httpStatus.CONFLICT, payload: 'User already invited' },
    USERS_SUCCESSFUL_PATCH: { code: httpStatus.OK, payload: 'User patched successfully' },
    USERS_UNSUCCESSFUL_PATCH: { code: httpStatus.NOT_FOUND, payload: 'Nothing was patched' },
    USERS_CANNOT_DISABLE_ADMINISTRATOR: { code: httpStatus.BAD_REQUEST, payload: 'Cannot disable yourself' },
    USERS_NOT_FOUND: { code: httpStatus.NOT_FOUND, payload: 'No users found' },
    USERS_NO_TOKEN_PROVIDEDD: { code: httpStatus.BAD_REQUEST, payload: 'No token found' },
    USERS_CANNOT_STRIP_ADMINISTRATIVE: { code: httpStatus.BAD_REQUEST, payload: 'Cannot strip yourself of administrative privileges' },
    USERS_UPDATE_SUCCESSFUL: { code: httpStatus.OK, payload: 'User updated successfully' },
    RESTAURANTS_INVALID_DETAILS: { code: httpStatus.BAD_REQUEST, payload: 'Invalid details' },
    RESTAURANTS_INVALID_NAME: { code: httpStatus.BAD_REQUEST, payload: 'Invalid name provided' },
    RESTAURANTS_SUCCESSFUL_CREATE: { code: httpStatus.CREATED, payload: 'Restaurant successfully created' },
    RESTAURANTS_SUCCESSFUL_UPDATE: { code: httpStatus.OK, payload: 'Restaurant successfully updated' },
    RESTAURANTS_N0_RESTAURANTS_FOUND: { code: httpStatus.NOT_FOUND, payload: 'No restaurants found' },
    COMMENT_INVALID_DETAILS: { code: httpStatus.BAD_REQUEST, payload: 'Invalid details provided' },
    COMMENT_INVALID_STARS: { code: httpStatus.BAD_REQUEST, payload: 'Star number should be between 1 and 5' },
    COMMENT_INVALID_COMMENT: { code: httpStatus.BAD_REQUEST, payload: 'Invalid comment' },
    COMMENT_INVALID_COMMENT_REPLY: { code: httpStatus.BAD_REQUEST, payload: 'Invalid comment reply' },
    COMMENT_INVALID_VISITED: { code: httpStatus.BAD_REQUEST, payload: 'Invalid visited datetime string' },
    COMMENT_NO_SUCH_RESTAURANT: { code: httpStatus.NOT_FOUND, payload: 'No restaurant to make comment to' },
    COMMENT_CREATED_SUCCESSFULLY: { code: httpStatus.CREATED, payload: 'Comment created successfully' },
    COMMENT_UPDATED_SUCCESSFULLY: { code: httpStatus.OK, payload: 'Comment updated successfully' },
    COMMENT_NO_COMMENT_FOUND: { code: httpStatus.NOT_FOUND, payload: 'No comment found' },
    COMMENT_REPLY_POSTED_SUCCESSFULLY: { code: httpStatus.CREATED, payload: 'Comment posted successfully' }
  };
function validCall(payload) {
  return {
    code: httpStatus.OK, payload: payload
  };
}
function successfulCreation(payload) {
  return {
    code: httpStatus.CREATED, payload: payload
  };
}

module.exports = {
  responses,
  validCall,
  successfulCreation
};