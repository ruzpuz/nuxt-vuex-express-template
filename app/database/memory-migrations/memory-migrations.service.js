const logger = require('app/common/log/logger.service');

function createSessionTable(memory) {
  logger.info('Setting up session table');

  async function transaction(t) {
    const createSessionTableSQL = `
      CREATE TABLE session (
        session_id TEXT    PRIMARY KEY,
        user_id    INTEGER NOT NULL,
        role_id    INTEGER NOT NULL,
        role_name  TEXT CHECK( role_name != '' ),
        first_name TEXT CHECK( first_name != '' ),
        last_name  TEXT CHECK( last_name != '' ),
        email      TEXT CHECK( email  != '' ),
        expires    TEXT CHECK( expires != '' ),
        CONSTRAINT unique_session UNIQUE (session_id),
        CONSTRAINT unique_uid UNIQUE (user_id),
        CONSTRAINT unique_email UNIQUE (email)
        );
    `;
    const createIndexOnSessionSQL = `
        CREATE INDEX id_index ON session (user_id);
        CREATE INDEX username_index ON session (username);
    `;
    const createLockdownTable = `
      CREATE TABLE lockdown (
        user_id    INTEGER NOT NULL,
        tries    INTEGER NOT NULL,
        CONSTRAINT _unique_uid UNIQUE (user_id) 
      );
    `;
    await t.raw(createSessionTableSQL).transacting(t);
    await t.raw(createIndexOnSessionSQL).transacting(t);
    await t.raw(createLockdownTable).transacting(t);

  }

  return memory.transaction(transaction);
}


module.exports = {
  migrations: [
    createSessionTable
  ]
};

