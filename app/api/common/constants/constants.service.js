const databaseService = require('../../../database/database.service');

const constants = {
  url: {
    API_PREFIX: '/api'
  },
  users: {
    roles: {
      NOT_LOGGED_IN: -1,
      ADMINISTRATOR: 1,
      USER: 2
    }
  },
  httpStatus: {
    OK: 200,
    CREATED: 201,
    FOUND: 302,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501
  },
  messenger: {
    GULP_FINISHED: 12389,
    RELOAD_BROWSER: 12390
  },
  database: {
    FOREIGN_KEY_VIOLATION: 23503,
    DUPLICATE_KEY: 23505,
    NOT_FOUND: -1
  },
  DEFAULT_LANGUAGE: 'us'
};

async function populateRoles() {

  const query = 'SELECT * FROM role;',
    database = databaseService.get().persistence,
    data = await database.raw(query);

  data.rows.forEach(function (role) {
    constants.users.roles[role.name.toUpperCase()] = role.id;
  });

  return data;
}
function populate() {
  return populateRoles();
}

module.exports = {
  constants,
  populate
};