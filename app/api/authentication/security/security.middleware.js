'use strict';

const securityController = require('app/api/authentication/security/security.controller');

function createMiddleware() {
  return async function(req, res, next) {
    let token;

    if(req.headers['ks-security']) {
      token = req.headers['ks-security'];
    } else {
      token = req.cookies['ks-security'];
    }

    const result = await securityController.resolve(token, req);

    if(!result) {
      return next();
    }

    res.status(result.code).json(result.payload);
  };
}
module.exports = createMiddleware;