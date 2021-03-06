const { responses, validCall } = require('app/api/common/responses/responses.service');
const { constants } = require('app/api/common/constants/constants.service');
const service = require('app/api/authentication/login/post/login.service');
const dataTransformService = require('app/api/common/transform-database-data/transform-data.service');
const keccak = require('keccak');

const FB = require('fb');
const registrationService = require('../../registration/post/new-user/registration.service');

function createHashedPassword(password) {
  return keccak('keccak512').update(password).digest('hex');
}
function getUser(details, language) {
  return service.checkLogin(details, language);
}
async function getSession(user, language) {
  const result = await service.getSessionByEmail(user.email, language);

  if(result.length === 1) {
    return result[0];
  }
}

async function handleLogin(body, language) {

  const validation = service.validateCall(body, language);

  if(validation) {
    return validation;
  }

  let user;
  let sessionId;

  body.password = createHashedPassword(body.password);
  body.email = body.email.toLocaleLowerCase();

  try {
    user = dataTransformService.transform(await getUser(body, language));
  } catch(error) {
    if(error.code) {
      return error;
    }
    return responses[language].UNKNOWN_SERVER_ERROR;
  }
  try {
    const session = await getSession(user, language);
    if(!session) {
      sessionId = await service.createSession(user);
    } else {
      sessionId = session.session_id;
    }

  } catch(error) {
    return error;
  }

  return validCall({
    'ks-security': sessionId,
    user
  });

}
async function handleFacebookLogin({ accessToken }, language) {
  Promise.promisifyAll(FB);
  if(accessToken) {

    try {
      await FB.apiAsync('me', { fields: [ 'id', 'name', 'email' ], access_token: accessToken });
    } catch(user) {
      if(user.error) {
        logger.log({ level: 'error', message: user.error });
        return responses[language].USERS_NOT_FOUND;
      }

      const email = user.email;

      const parts = user.name.split(' ');
      user.firstName = parts[0];
      user.lastName = parts[1];
      user.roleId = constants.users.roles.USER;
      user.roleName = 'User';
      user.password = registrationService.createHashedPassword(Math.random().toString());
      user.confirmationToken = registrationService.createHashedPassword(Math.random().toString());

      const found = await service.findUserByEmail(email, language);
      if(!found) {
        try {
          await registrationService.saveNewUser(user, language, true);
        } catch(e) {
          return responses[language].UNKNOWN_SERVER_ERROR;
        }
        const existingSession = await service.getSessionByEmail(user.email, language);

        if(existingSession.length > 0) {
          return validCall({
            user,
            'ks-security': existingSession[0].session_id
          });
        }
        const session = await service.createSession(user);
        return validCall({
          user,
          'ks-security': session
        });
      }
      found.firstName = found.first_name;
      found.lastName = found.last_name;
      found.roleId = user.roleId;
      found.roleName = user.roleName;

      const existingSession = await service.getSessionByEmail(user.email, language);
      if(existingSession.length > 0) {
        return validCall({
          user,
          'ks-security': existingSession[0].session_id
        });
      }
      const session = service.createSession(user);
      return validCall({
        user,
        'ks-security': session
      });
    }
  }
  return responses[language].USERS_NO_TOKEN_PROVIDEDD;

}

module.exports = {
  handleLogin,
  handleFacebookLogin
};