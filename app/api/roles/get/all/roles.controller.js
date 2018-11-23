const service = require('./roles.service');
const responseService = require('app/api/common/responses/responses.service');
const responses = responseService.responses;
const logger = require('app/common/log/logger.service');

async function getRoles() {
  try {
    return responseService.validCall( { roles: await service.getRoles() })
  } catch(error) {
    logger.error('Database error');
    logger.error(error);

    return responseService.responses.UNKNOWN_SERVER_ERROR;
  }
}
module.exports = {
  getRoles
}