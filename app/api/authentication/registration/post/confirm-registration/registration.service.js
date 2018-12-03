const { responses } = require('app/api/common/responses/responses.service');
const databaseService = require('app/database/database.service');

function validateCall(body) {
  if(!body.confirmationToken) {
    return responses.REGISTRATION_NO_CONFIRMATION_TOKEN;
  }
}

function confirmRegistration({ confirmationToken: token }) {
  const { persistence: database } = databaseService.get();

  async function transaction(t) {
    const findUserSQL = `
      SELECT 
        count(*) AS count
      FROM 
        "public"."security"
      WHERE
        confirmation_token = ?
    `;
    const confirmUserSQL = `
      UPDATE
        "public"."security"
      SET
        confirmed = true
      WHERE 
        confirmation_token = ?;
    `;

    const { rows: found } = await t.raw(findUserSQL, [ token ]);

    if(found[0].count === 0) {
      throw responses.CONFIRMATION_USER_NOT_FOUND;
    }

    await t.raw(confirmUserSQL, [ token ]);
  }
  return database.transaction(transaction);
}
module.exports = {
  validateCall,
  confirmRegistration
};