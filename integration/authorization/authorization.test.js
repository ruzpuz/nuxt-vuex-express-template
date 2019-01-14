const { scenario: registrationScenario } = require('./registration/registration.test');


function scenario() {
  describe('Testing authorization scenarios', function authorizationScenario() {

    this.timeout(0);

    registrationScenario();

  });
}

module.exports = {
  scenario
};