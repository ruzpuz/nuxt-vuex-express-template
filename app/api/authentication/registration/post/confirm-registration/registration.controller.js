const registrationService = require('./registration.service'),
  responses = require('app/api/common/responses/responses.service').responses,
  logger = require('app/common/log/logger.service');

async function handleCall(body) {
  const validation = registrationService.validateCall(body);
  if(validation) {
    return validation;
  }
  try {
    await registrationService.confirmRegistration(body);

    return responses.CONFIRMATION_USER_CONFIRMED;
  } catch(error) {
    error.code = Number(error.code);
    if(error.code) {
      return error;
    }
    logger.log({ level: 'error', message: error });

    return responses.UNKNOWN_SERVER_ERROR;
  }
}

module.exports = {
  handleCall
};