'use strict';

const stringValidation = require('app/api/common/validation/string/string-validation.service'),
  constants = require('app/api/common/constants/constants.service').constants,
  responses = require('app/api/common/responses/responses.service').responses;

function validate(token) {
  if(!stringValidation.isString(token)) {
    return responses.AUTHORIZATION_BAD_TOKEN;
  }
}
function createSecurityModel(session) {
  if(!session) {
    return {
      roleId: constants.users.roles.NOT_LOGGED_IN
    };

  }
  return {
    id: session.user_id,
    roleId: session.role_id,
    roleName: session.role_name,
    firstName: session.first_name,
    lastName: session.last_name,
    email: session.email
  };

}

module.exports = {
  validate,
  createSecurityModel
};