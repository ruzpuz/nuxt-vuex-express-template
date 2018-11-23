'use strict';

function getEnvironment() {

  if(process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }

  return 'development';

}
function getBaseUrl() {
  if(getEnvironment() === 'development') {
    return 'http://localhost:3010'
  }
}

module.exports = {
  environment: getEnvironment(),
  baseURL: getBaseUrl()
};
