const assert = require('assert');
const http = require('axios');

const { constants } = require('app/api/common/constants/constants.service');
const { httpStatus } = constants;

const { INVALID_LOGIN_DETAILS, LOGIN_DETAILS } = require('integration/common/data');

async function unsuccessfullLogin() {
  try {
    const { status } = await http.post('http://localhost:3010/api/login', INVALID_LOGIN_DETAILS);
    assert.notStrictEqual(status, httpStatus.OK);
  } catch({ code, response }) {
    if(code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    assert.strictEqual(response.status, httpStatus.NOT_FOUND);
  }
}
async function successfullLogin() {
  try {
    const { status } = await http.post('http://localhost:3010/api/login', LOGIN_DETAILS);
    assert.strictEqual(status, httpStatus.OK);
  } catch(error) {
    if(error.code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    throw error;
  }
}

function scenario() {
  describe('Testing login scenario', function authorizationScenario() {

    it('Invalid login details', unsuccessfullLogin);
    it('Successful login', successfullLogin);

  });
}

module.exports = { scenario };