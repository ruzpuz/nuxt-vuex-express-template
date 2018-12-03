const service = require('./registration.service');
const { responses } = require('app/api/common/responses/responses.service');
const logger = require('app/common/log/logger.service');

async function handleCall(body) {
  const validation = service.validateCall(body);
  if(validation) {
    return validation;
  }
  try {
    await service.confirmRegistration(body);

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