const stringValidation = require('app/api/common/validation/string/string-validation.service');
const emailValidation = require('app/api/common/validation/emails/emails-validation.service');
const numberValidation = require('app/api/common/validation/numbers/numbers-validation.service');
const responses = require('app/api/common/responses/responses.service').responses;
const databaseService = require('app/database/database.service');
const constants = require('app/api/common/constants/constants.service').constants;
const keccak = require('keccak');
const nodemailer = require('nodemailer');
const emailConfiguration = require('configuration/email/email-configuration.service');
const transporter = nodemailer.createTransport(emailConfiguration);

const { baseURL } = require('app/common/environment/environment.service');

function validateCall(body) {

  if(Object.keys(body).length !== 4) {
    return responses.REGISTRATION_INVALID_DETAILS;
  } else if(!stringValidation.isString(body.firstName) || body.firstName.length > 128 || body.firstName.length === 0) {
    return responses.REGISTRATION_INVALID_FIRST_NAME;
  } else if(!stringValidation.isString(body.lastName) || body.lastName.length > 128 || body.lastName.length === 0) {
    return responses.REGISTRATION_INVALID_LAST_NAME;
  } else if(!emailValidation.isValid(body.email) || body.email.length > 128 || body.email.length === 0) {
    return responses.REGISTRATION_INVALID_EMAIL;
  } else if(body.roleId === constants.users.roles.ADMINISTRATOR) {
    return responses.REGISTRATION_CANNOT_BE_ADMINISTRATOR;
  } else if(!stringValidation.isString(body.password) || body.password.length === 0) {
    return responses.REGISTRATION_NO_PASSWORD;
  }
}
function createConfirmationToken() {
  return keccak('keccak512').update(`User registered at ${new Date()}. Random ${Math.random()}`).digest('hex');
}
function createHashedPassword(password) {
  return keccak('keccak512').update(password).digest('hex');
}
function sendConfirmationEmail(user) {
  return {
    from: `"Concierge Service" <${emailConfiguration.auth.user}>`,
    to: `${user.email}`,
    subject: 'Registration successful ✔',
    text: `
            Hello ${user.firstName} ${user.lastName},
            
            You or somebody on your behalf registered on Klitstarter.

            If this was not you please disregard or report this email. Otherwise you can proceed to
             
            ${baseURL}/confirm/${user.confirmationToken}
            
            Best regards,
            Klitstarter concierge service
            `,
    html: `
            <p>
             Hello ${user.firstName} ${user.lastName},
            </p>
            <p>
             You or somebody on your behalf registered on website.
            </p>
            <p>
              If this was not you please disregard or report this email. Otherwise you can proceed to
              <a href="${baseURL}/confirm/${user.confirmationToken}"> here </a> to confirm your registration
            </p>
            <p>
                Best regards,
            </p>
            <p>
                Klitstarter concierge service
            </p>`
  };
}

async function saveNewUser(user, autoValidate) {
  const database = databaseService.get().persistence,
    createNewUserSQL = `
      WITH inserted_user AS (
        INSERT INTO
          "public"."user" (email, first_name, last_name)
        VALUES
          (?, ?, ?)
        RETURNING id
      ),
      inserted_security AS (
        INSERT INTO 
          "public"."security" (user_id, security, confirmation_token, confirmed)
        SELECT id, ?, ?, ? FROM inserted_user
      )
     INSERT INTO
      "public"."users_roles" (user_id, role_id)
      SELECT (SELECT id FROM inserted_user), (SELECT id FROM "public"."role" WHERE name = 'user');`;


  user.confirmationToken = createConfirmationToken();
  try {
    await database.raw(createNewUserSQL, [
      user.email,
      user.firstName,
      user.lastName,
      user.password,
      user.confirmationToken,
      !!autoValidate
    ]);
    Promise.promisifyAll(transporter);

    if(!autoValidate) {
      await transporter.sendMailAsync(sendConfirmationEmail(user));
    }

    return responses.REGISTRATION_SUCCESSFUL;
  } catch(error) {
    error.code = Number(error.code);
    if(error.code === constants.database.DUPLICATE_KEY) {
      return responses.REGISTRATION_FAILED_USER_ALREADY_REGISTERED;
    } else if(error.code === constants.database.FOREIGN_KEY_VIOLATION) {
      return responses.REGISTRATION_FAILED_NO_SUCH_ROLE;
    }
    console.log(error);
    return responses.UNKNOWN_SERVER_ERROR;
  }
}

module.exports = {
  validateCall,
  createHashedPassword,
  saveNewUser
};