
const configuration = require('./configuration/database/database-configuration.service');

module.exports = {

  development: configuration.persistence,
  testing: configuration.persistence,
  production: configuration.persistence

};