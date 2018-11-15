const controller = require('./roles.controller');
const apiPrefix = require('app/api/common/constants/constants.service').constants.url.API_PREFIX;
async function getAllRolesRoute(req, res) {
  const response = await controller.getRoles();

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
 */

module.exports = function (app) {
  app.get(apiPrefix + '/roles', getAllRolesRoute);
};