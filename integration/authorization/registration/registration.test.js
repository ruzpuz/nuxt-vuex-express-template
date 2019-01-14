const assert = require('assert');
const http = require('axios');
const databaseService = require('app/database/database.service');
const { constants } = require('app/api/common/constants/constants.service');
const { httpStatus } = constants;

const user = {
  firstName: 'Test first name',
  lastName: 'Test last name',
  email: 'puz@mailinator.com',
  password: 'a'
};
const loginDetails = {
  email: 'puz@mailinator.com',
  password: 'a'
};
const dummyToken = 'a';

async function registerUser() {
  const { status } = await http.post('http://localhost:3010/api/registration', user);

  assert.strictEqual(status, httpStatus.CREATED);
}
async function registerUserAgain() {
  try {
    const { status } = await http.post('http://localhost:3010/api/registration', user);
    assert.notStrictEqual(status, httpStatus.CREATED);
  } catch({ code, response }) {
    if(code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    assert.strictEqual(response.status, httpStatus.CONFLICT);
  }
}

async function loginFailedUnconfirmed() {
  try {
    const { status } = await http.post('http://localhost:3010/api/login', loginDetails);
    assert.notStrictEqual(status, httpStatus.OK);
  } catch({ code, response }) {
    if(code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    assert.strictEqual(response.status, httpStatus.FORBIDDEN);
  }
}
async function confirmationFailsNoToken() {
  try {
    const { status } = await http.post('http://localhost:3010/api/confirm');
    assert.notStrictEqual(status, httpStatus.OK);
  } catch({ code, response }) {
    if(code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    assert.strictEqual(response.status, httpStatus.BAD_REQUEST);
  }
}
async function confirmationFailsNoUser() {
  try {
    const { status } = await http.post('http://localhost:3010/api/confirm', { confirmationToken: dummyToken });

    assert.notStrictEqual(status, httpStatus.OK);
  } catch(error) {
    if(error.code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    assert.strictEqual(error.response.status, httpStatus.NOT_FOUND);
  }
}

async function confirmUser() {
  const { persistence: database } = databaseService.get();

  const sql = `
    SELECT
      confirmation_token 
    FROM
      "public"."security" 
    WHERE user_id = (
      SELECT id FROM "public"."user" WHERE email = ?
    );
  `;
  const { rows } = await database.raw(sql, user.email);
  const confirmationToken = rows[0].confirmation_token;

  try {
    const { status } = await http.post('http://localhost:3010/api/confirm', { confirmationToken });
    assert.strictEqual(status, httpStatus.OK);
  } catch(error) {
    if(error.code === 'ECONNREFUSED') {
      throw new Error('The application is not running. Cannot continue with tests');
    }
    throw error;
  }

}

async function scenario() {

  describe('Testing registration scenarios', function () {

    it('Successful registration', registerUser);
    it('Duplicate user registration failure', registerUserAgain);
    it('Unconfirmed user login failure', loginFailedUnconfirmed);
    it('Bad confirmation request', confirmationFailsNoToken);
    it('Confirmation of non existent token', confirmationFailsNoUser);
    it('Confirm registered user', confirmUser);

  });
}

module.exports = {
  scenario
};