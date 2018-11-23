const registrationService = require('./registration.service');

async function handleCall(body, autoValidate) {
  const validation = registrationService.validateCall(body);
  if(validation) {
    return validation;
  }
  body.password = registrationService.createHashedPassword(body.password);
  return await registrationService.saveNewUser(body, autoValidate);
}

module.exports = {
  handleCall
};