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

const composeEmail = {
  REGISTRATION_CONFIRMATION(language, user)  {
    if(language === 'us') {
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
    } else if(language === 'rs') {
      return {
        from: `"Concierge Service" <${emailConfiguration.auth.user}>`,
        to: `${user.email}`,
        subject: 'Registration successful ✔',
        text: `
            Zdravo,
            
            Vi ste se ili neko u Vaše ime registrovali na Klitstarteru.

            Ako to niste bili Vi slobodno ignorišite ovaj e-mail. Inače možete nastaviti na 
             
            ${baseURL}/confirm/${user.confirmationToken}
            
            Sve najbolje,
            Klitstarter servis
            `,
        html: `
            <p>
              Zdravo,
            </p>
            <p>
              Vi ste se ili neko u Vaše ime registrovali na Klitstarteru.
            </p>
            <p>
              Ako to niste bili Vi slobodno ignorišite ovaj e-mail. Inače možete nastaviti 
              <a href="${baseURL}/confirm/${user.confirmationToken}"> ovde </a> da biste potvrdili vašu registraciju
            </p>
            <p>
                sve najbolje,
            </p>
            <p>
                Klitstarter servis
            </p>`
      };
    }
  }
};
module.exports = {
  responses,
  validCall,
  successfulCreation,
  composeEmail
};