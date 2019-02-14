const controller = require('./roles.controller');
const apiPrefix = require('app/api/common/constants/constants.service').constants.url.API_PREFIX;
const { RANDOM_SECURITY } = process.env;
const { responses } = require('app/api/common/responses/responses.service');
const { constants } = require('app/api/common/constants/constants.service');

async function getAllRolesRoute(req, res) {
  const { language } = req.headers;
  let response;

  if(req.headers.security.token === RANDOM_SECURITY ||
    req.headers.security.roleId !== constants.users.roles.NOT_LOGGED_IN
  ) {
    response = await controller.getRoles(language);
  } else {
    response = responses[language].ROLES_UNAUTHORIZED;
  }
  res.status(response.code).json(response.payload);
}
/**
 * @api {get} /api/roles/ 01 - List existing roles on server
 * @apiName Get roles
 * @apiGroup Role
 * @apiDescription Api endpoint that fetches roles from the server.
 *
 * @apiVersion 0.0.1
 *
 *
 * @apiSuccess {Array} roles Array of roles
 * @apiSuccess {Integer} roles.id The ID
 * @apiSuccess {String} roles.name Name od the role
 * @apiSuccessExample {json} Success-Response:
 {
    "roles": [
        {
            "id": "ad34041d-4c06-49b6-831a-55bca296d8ac",
            "name": "administrator"
        },
        {
            "id": "a0ee7a6d-4348-41a5-b1b9-39e66dbbe32a",
            "name": "user"
        }
    ]
}
 * @apiError (Unauthorized 401) {String} ROLES_UNAUTHORIZED Happens when the request is not authorized either by logging in or by random token
 *
 * @apiError (Internal server error 500) {String} UNKNOWN_DATABASE_ERROR Happens when the operation failed for unknown reasons on the database. Should not happen in normal circumstances
 *
 */

module.exports = function (app) {
  app.get(apiPrefix + '/roles', getAllRolesRoute);
};