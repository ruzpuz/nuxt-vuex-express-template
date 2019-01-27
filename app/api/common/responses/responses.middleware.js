const validLanguages = Object.keys(require('app/api/common/responses/responses.service').responses);
const { constants } = require('app/api/common/constants/constants.service');

function isValidLanguage(language) {
  return validLanguages.some(function (item) {
    return item === language;
  });
}

module.exports = async function(req, res, next) {
  let language;

  if(req.headers.language) {
    language = req.headers.language;
  } else {
    language = req.cookies.language;
  }

  if(!language || !isValidLanguage(language)) {
    language = constants.DEFAULT_LANGUAGE;
  }

  req.headers.language = language;

  return next();

};