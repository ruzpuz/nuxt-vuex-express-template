'use strict';

const securityService = require('app/api/authentication/security/security.service'),
  memoryService = require('app/api/authentication/authentication.memory-service');

async function resolve(token, request) {

  if(!token) {
    request.headers.security = securityService.createSecurityModel();
    return;
  }

  const validation = securityService.validate(token, request.headers[ 'ks-security' ]);

  if(validation) {
    return validation;
  }

  request.headers.security = securityService.createSecurityModel(await memoryService.getSession(token));
}

module.exports = {
  resolve
};