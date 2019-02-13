const assert = require('assert');
const http = require('axios');
const databaseService = require('app/database/database.service');
const { constants } = require('app/api/common/constants/constants.service');
const { httpStatus } = constants;

const { USER } = require('integration/common/data');

async function forgotPassword() {
  try {
    const { status } = await http.post('http://localhost:3010/api/forgot-password', { email: USER.email });

    assert.strictEqual(status, httpStatus.OK);
  } catch(error) {
    if(error.code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    throw error;
  }
}
async function forgotPasswordNonExistentUser() {
  try {
    const { status } = await http.post('http://localhost:3010/api/forgot-password', { email: 'puzic@mailinator.com' });

    assert.strictEqual(status, httpStatus.OK);
  } catch(error) {
    if(error.code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    throw error;
  }
}
async function forgotPasswordInvalidCall() {
  try {
    const { status } = await http.post('http://localhost:3010/api/forgot-password', { });

    assert.notStrictEqual(status, httpStatus.OK);
  } catch(error) {
    if(error.code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    assert.strictEqual(error.response.status, httpStatus.BAD_REQUEST);
  }
}
async function restorationPossibleCall() {
  const { persistence: database } = databaseService.get();

  try {
    const { rows } = await database.raw('SELECT restoration_token FROM "public"."security" WHERE "user_id" = ?;', [ USER.id ]);
    USER.restorationToken = rows[0].restoration_token;

    const { status } = await http.get(`http://localhost:3010/api/restore-password/${USER.restorationToken}/check`);

    assert.strictEqual(status, httpStatus.OK);
  } catch(error) {
    if(error.code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    throw error;
  }
}
async function restorationImpossibleCall() {
  try {
    const { status } = await http.get('http://localhost:3010/api/restore-password/1/check');

    assert.notStrictEqual(status, httpStatus.OK);
  } catch(error) {
    if(error.code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    assert.strictEqual(error.response.status, httpStatus.NOT_FOUND);
  }
}
async function restorePasswordCall() {
  try {
    const { status } = await http.post('http://localhost:3010/api/restore-password/', { password: USER.password, restorationToken: USER.restorationToken });
    assert.strictEqual(status, httpStatus.OK);
  } catch(error) {
    if(error.code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    throw error;
  }
}
async function restorePasswordInvalidCall() {
  try {
    const { status } = await http.post('http://localhost:3010/api/restore-password/', { password: USER.password, restorationToken: USER.restorationToken });
    delete USER.restorationToken;

    assert.notStrictEqual(status, httpStatus.OK);
  } catch(error) {
    if(error.code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    assert.strictEqual(error.response.status, httpStatus.NOT_FOUND);
  }
}


async function scenario() {

  describe('Testing password restoration scenarios', function () {

    it('Forgot password', forgotPassword);
    it('Forgot password - non existent user', forgotPasswordNonExistentUser);
    it('Forgot password - invalid call', forgotPasswordInvalidCall);
    it('Restore password - restoration possible', restorationPossibleCall);
    it('Restore password - restoration impossible', restorationImpossibleCall);
    it('Restore password - restore password success', restorePasswordCall);
    it('Restore password - restore password failure', restorePasswordInvalidCall);

  });
}

module.exports = {
  scenario
};