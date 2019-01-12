const assert = require('assert');
const http = require('axios');
const { constants } = require('../../../app/api/common/constants/constants.service');
const { httpStatus } = constants;

async function getHealth() {
  try{
    const { status } = await http.get('http://localhost:3010/api/health');

    assert.strictEqual(status, httpStatus.OK);

  } catch(error) {
    if(error.code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    throw error;
  }
}

async function scenario() {

  it('Checking health', getHealth);

}

module.exports = { scenario }