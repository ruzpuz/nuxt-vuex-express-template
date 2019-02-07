const apiPrefix = require('app/api/common/constants/constants.service').constants.url.API_PREFIX;
const controller = require('./forgot-password.controller');

async function forgotPasswordRoute(req, res) {
  const response = await controller.handleCall(req.body, req.headers.language);

  res.status(response.code).json(response.payload);
}

module.exports = function (app) {
  app.post(apiPrefix + '/forgot-password', forgotPasswordRoute);
};