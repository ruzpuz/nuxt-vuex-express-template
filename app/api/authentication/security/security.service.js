const stringValidation = require('app/api/common/validation/string/string-validation.service');
const { constants } = require('app/api/common/constants/constants.service');
const { responses } = require('app/api/common/responses/responses.service');

function validate(token, language) {
  if(!stringValidation.isString(token)) {
    return responses[language].AUTHORIZATION_BAD_TOKEN;
  }
}
function createSecurityModel(token, session) {
  if(!session) {
    return {
      token,
      roleId: constants.users.roles.NOT_LOGGED_IN
    };
  }
  return {
    token,
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