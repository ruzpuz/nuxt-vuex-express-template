const { constants } = require('app/api/common/constants/constants.service');
const { httpStatus } = constants;
const us = require('./us/en-US');
const rs = require('./rs/rs-RS');

const responses = { us, rs };

function validCall(payload) {
  return {
    code: httpStatus.OK, payload: payload
  };
}
function successfulCreation(payload) {
  return {
    code: httpStatus.CREATED, payload: payload
  };
}

module.exports = {
  responses,
  validCall,
  successfulCreation
};