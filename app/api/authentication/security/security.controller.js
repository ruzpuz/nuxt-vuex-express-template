const service = require('./security.service');
const memoryService = require('app/api/authentication/authentication.memory-service');

async function resolve(token, request) {

  if(!token) {
    request.headers.security = service.createSecurityModel();
    return;
  }

  const validation = service.validate(token, request.headers.language);

  if(validation) {
    return validation;
  }

  request.headers.security = service.createSecurityModel(token, await memoryService.getSession(token));
}

module.exports = {
  resolve
};