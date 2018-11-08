const { constants } = require('app/api/common/constants/constants.service');
const httpStatus = constants.httpStatus;
const responses = {
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
  REGISTRATION_SUCCESSFUL: { code: httpStatus.CREATED, payload: 'Registration is successful' }
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