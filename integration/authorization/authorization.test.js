const { scenario: registrationScenario } = require('./registration/registration.test');
const { scenario: loginScenario } = require('./login/login.test');

function scenario() {
  describe('Testing authorization scenarios', function authorizationScenario() {

    this.timeout(0);

    registrationScenario();
    loginScenario();

  });
}

module.exports = {
  scenario
};