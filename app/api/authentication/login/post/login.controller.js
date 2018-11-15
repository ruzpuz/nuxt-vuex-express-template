'use strict';

const responsesService = require('app/api/common/responses/responses.service'),
  responses = responsesService.responses,
  { constants } = require('app/api/common/constants/constants.service'),
  loginService = require('app/api/authentication/login/post/login.service'),
  dataTransformService = require('app/api/common/transform-database-data/transform-data.service'),
  keccak = require('keccak');

const FB = require('fb');
const registrationService = require('../../registration/post/new-user/registration.service');

function createHashedPassword(password) {
  return keccak('keccak512').update(password).digest('hex');
}
function getUser(details) {
  return loginService.checkLogin(details);
}
async function getSession(user) {
  const result = await loginService.getSessionByEmail(user.email);

  if(result.length === 1) {
    return result[0];
  }
}

async function handleLogin(body) {

  const validation = loginService.validateCall(body);

  if(validation) {
    return validation;
  }

  let user,
    sessionId;

  body.password = createHashedPassword(body.password);

  try {
    user = dataTransformService.transform(await getUser(body));
  } catch(error) {
    if(error.code) {
      return error;
    }
    return responses.UNKNOWN_SERVER_ERROR;
  }
  try {
    const session = await getSession(user);
    if(!session) {
      sessionId = await loginService.createSession(user);
    } else {
      sessionId = session.session_id;
    }

  } catch(error) {
    return error;
  }

  return responsesService.validCall({
    'ks-security': sessionId,
    user
  });

}
async function handleFacebookLogin({ accessToken }) {
  Promise.promisifyAll(FB);
  if(accessToken) {

    try {
      await FB.apiAsync('me', { fields: [ 'id', 'name', 'email' ], access_token: accessToken });
    } catch(user) {
      if(user.error) {
        logger.log({ level: 'error', message: user.error });
        return responses.USERS_NOT_FOUND;
      }

      const email = user.email;

      const parts = user.name.split(' ');
      user.firstName = parts[0];
      user.lastName = parts[1];
      user.roleId = constants.users.roles.USER;
      user.roleName = 'User';
      user.password = registrationService.createHashedPassword(Math.random().toString());
      user.confirmationToken = registrationService.createHashedPassword(Math.random().toString());

      const found = await loginService.findUserByEmail(email);
      if(!found) {
        try {
          await registrationService.saveNewUser(user, true);
        } catch(e) {
          return responses.UNKNOWN_SERVER_ERROR;
        }
        const existingSession = await loginService.getSessionByEmail(user.email);

        if(existingSession.length > 0) {
          return responsesService.validCall({
            user,
            'ks-security': existingSession[0].session_id
          });
        }
        const session = await loginService.createSession(user);
        return responsesService.validCall({
          user,
          'ks-security': session
        });
      }
      found.firstName = found.first_name;
      found.lastName = found.last_name;
      found.roleId = user.roleId;
      found.roleName = user.roleName;

      const existingSession = await loginService.getSessionByEmail(user.email);
      if(existingSession.length > 0) {
        return responsesService.validCall({
          user,
          'ks-security': existingSession[0].session_id
        });
      }
      const session = loginService.createSession(user);
      return responsesService.validCall({
        user,
        'ks-security': session
      });


    }
    return responsesService.validCall('soon');
  }
  return responses.USERS_NO_TOKEN_PROVIDEDD;

}

module.exports = {
  handleLogin,
  handleFacebookLogin
};