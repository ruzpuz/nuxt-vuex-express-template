const assert = require('assert');
const http = require('axios');

async function registerUser() {
  try{
    const data = await http.get('http://localhost:3010/api/health');
    conso
  } catch(error) {
    console.log(error.code);
  }
}

async function registerUserAgain() {

}

async function confirmUser() {

}

async function scenario() {

  describe('Testing registration scenarios', function () {

    it('Successful registration', registerUser);

  })
}

module.exports = {
  scenario
};