'use strict';

const validationService = require('./security.service'),
  assert = require('assert');


function validationServiceNoToken() {

  const response = validationService.validate(null, 'rs');

  assert(response.code === 400);

}
describe('Testing security middleware', function() {

  it('Validation service - no token', validationServiceNoToken);

});