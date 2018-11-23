'use strict';

function patternValidation(text, pattern) {
  return (new RegExp(pattern).test(text));
}

module.exports = {
  isValid: patternValidation
};