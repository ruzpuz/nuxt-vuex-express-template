const service = require('./roles.service');
const { responses, validCall } = require('app/api/common/responses/responses.service');
const logger = require('app/common/log/logger.service');

async function getRoles() {
  try {
    return validCall( { roles: await service.getRoles() });
  } catch(error) {
    logger.error('Database error');
    logger.log({ level: 'error', message: error });

    return responses.UNKNOWN_SERVER_ERROR;
  }
}
module.exports = {
  getRoles
};