'use strict';

const responses = require('app/api/common/responses/responses.service').responses,
  emailValidation = require('app/api/common/validation/emails/emails-validation.service'),
  databaseService = require('app/database/database.service'),
  logger = require('app/common/log/logger.service'),
  keccak = require('keccak');

function validateCall(body) {

  if(Object.keys(body).length !== 2) {
    return responses.LOGIN_INVALID_DETAILS;
  } else if(!emailValidation.isValid(body.email)) {
    return responses.LOGIN_INVALID_EMAIL;
  } else if(!body.password) {
    return responses.LOGIN_NO_PASSWORD;
  }
}
function generateSessionToken(id) {
  const statement = `
    User ${id} logged in.
    Timestamp: ${(new Date()).toISOString()}
    Control string ${Math.random()}
  `;

  return keccak('keccak512').update(statement).digest('hex');
}
async function markLoginFailure(id) {
  const { memory: memoryDatabase, persistence: persistenceDatabase } = databaseService.get();

  async function transaction(t) {
    const findLockdownSQL = `
      SELECT * from lockdown WHERE user_id = ?;
    `;
    const updateLockdownSQL = `
      UPDATE lockdown SET tries = ? WHERE user_id = ?;
    `;
    const insertLockdownSQL = `
      INSERT INTO lockdown VALUES 
      (?, 0 );
    `;

    const lockdown = await t.raw(findLockdownSQL, [ id ]);
    if(lockdown.length === 0) {
      await t.raw(insertLockdownSQL, [ id ]);
      return;
    } else if(lockdown[0].tries === 3) {
      await persistenceDatabase.raw('UPDATE "public"."security" SET disabled = true WHERE user_id = ?', [ id ]);
    }
    await t.raw(updateLockdownSQL, [ lockdown[0].tries + 1, id ]);
  }
  try {
    await memoryDatabase.transaction(transaction);
  } catch(error) {
    logger.error(error);
  }
}
async function checkLogin(details) {
  let user;
  const persistenceDatabase = databaseService.get().persistence;
  async function transaction(t) {
    const findUserSQL = `
      SELECT
        u.id AS id,
        u.first_name,
        u.last_name,
        u.email,
        r.id AS role_id,
        r.name AS role_name
      FROM 
        "public"."user" AS u
      JOIN
        "public"."users_roles" AS ur on ur.user_id = u.id
      JOIN
        "public"."role" AS r ON r.id = ur.role_id
      WHERE 
        u.email = ?`;
    const findUserSecurity = `
      SELECT 
        *
      FROM 
        "public"."security"
      WHERE
        user_id = ?
    `;

    const { rows: users, rowCount: count } = await t.raw(findUserSQL, details.email);

    if(count !== 1) {
      throw responses.LOGIN_NO_USER_FOUND;
    }
    const { rows: security } = await t.raw(findUserSecurity, users[0].id);

    if(details.password === security[0].security) {
      if(!security[0].confirmed) {
        throw responses.LOGIN_USER_NOT_CONFIRMED;
      } else if(security[0].disabled) {
        throw responses.LOGIN_USER_DISABLED;
      }
    } else {
      await markLoginFailure(users[0].id);
      throw responses.USERS_NOT_FOUND;
    }
    user = users[0];

  }
  await persistenceDatabase.transaction(transaction);

  return user;
}

async function getSessionByEmail(email) {
  const memoryDatabase = databaseService.get().memory,
    sql = `
     SELECT session_id FROM SESSION WHERE email = ?;
  `;
  try {
    return await memoryDatabase.raw(sql, [ email ]);
  } catch(error) {
    logger.error('Database operation failed');
    logger.error(error);
    console.log(error);

    throw responses.UNKNOWN_SERVER_ERROR;
  }
}
async function createSession(user) {
  const memoryDatabase = databaseService.get().memory,
    now = new Date(),
    sql = `
      INSERT INTO
        session (
          session_id,
          user_id,
          role_id,
          role_name,
          first_name,
          last_name,
          email,
          expires
        )
      VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?
      )
  `;

  now.setDate(now.getDate() + 1);

  try {
    const sessionId = generateSessionToken(user.id),
      nowISO = now.toISOString();

    await memoryDatabase.raw(sql, [
      sessionId,
      user.id,
      user.roleId,
      user.roleName,
      user.firstName,
      user.lastName,
      user.email,
      nowISO
    ]);

    return sessionId;
  } catch(error) {
    console.log(error);
    logger.error('Database operation failed');
    logger.error(error);
    throw responses.UNKNOWN_SERVER_ERROR;
  }

}
async function findUserByEmail(email) {
  const persistenceDatabase = databaseService.get().persistence;

  const { rows } = await persistenceDatabase.raw('SELECT * FROM "public"."user" WHERE email = ?', [ email ]);

  return rows[0];
}

module.exports = {
  validateCall,
  checkLogin,
  getSessionByEmail,
  createSession,
  findUserByEmail
};