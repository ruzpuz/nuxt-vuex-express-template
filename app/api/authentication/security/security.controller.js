const service = require('./security.service');
const memoryService = require('app/api/authentication/authentication.memory-service');

async function resolve(token, request) {

  if(!token) {
    request.headers.security = service.createSecurityModel();
    return;
  }

  const validation = service.validate(token, request.headers['ks-security']);

  if(validation) {
    return validation;
  }

  request.headers.security = service.createSecurityModel(await memoryService.getSession(token));
}

module.exports = {
  resolve
};