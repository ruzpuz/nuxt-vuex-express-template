const service = require('./registration.service');

async function handleCall(body, autoValidate) {
  const validation = service.validateCall(body);
  if(validation) {
    return validation;
  }
  body.password = service.createHashedPassword(body.password);
  return await service.saveNewUser(body, autoValidate);
}

module.exports = {
  handleCall
};