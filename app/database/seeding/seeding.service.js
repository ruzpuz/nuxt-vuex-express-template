const logger = require('app/common/log/logger.service');
const databaseConfiguration = require('configuration/database/database-configuration.service')
const knex = require('knex');
const persistence = knex(databaseConfiguration.persistence);

async function emptyDatabase(shallExit) {
  const clearingSQL = `    
    do
     $$
      declare
        l_stmt text;
      begin 
        select 'truncate ' || string_agg(format('%I.%I', schemaname, tablename), ',')
        into l_stmt 
        from pg_tables
        where schemaname in ('public') and 
        tablename not in ('knex_migrations', 'knex_migrations_lock');
        execute l_stmt;
      end;
      $$
  `;
  try {
    await persistence.raw(clearingSQL);
    logger.info('Successful clearing');
    if(shallExit) {
      process.exit();
    }
  } catch(error) {
    logger.error('Database error');
    logger.log({level: 'error', message: error});
    process.exit(-1);
  }
}
async function seedInitial() {
  await emptyDatabase();
  async function transaction(t) {
    const insertRolesSQL = `
        INSERT INTO "public"."role"(name) VALUES ('administrator'), ('user');
      `;
    const insertAdministratorSQL = `
        WITH inserted_admin AS (
          INSERT INTO "public"."user" (email, first_name, last_name) VALUES ('administrator@test.com', 'Test', 'Administrator') RETURNING id
        ), inserted_admin_roles AS (
           INSERT INTO "public"."users_roles" (user_id, role_id)
               SELECT (SELECT id FROM inserted_admin), (SELECT id FROM "public"."role" WHERE name = 'administrator')
        )
        INSERT INTO "public"."security" 
        
        SELECT
         id,
         '9c46dbec5d03f74352cc4a4da354b4e9796887eeb66ac292617692e765dbe400352559b16229f97b27614b51dbfbbb14613f2c10350435a8feaf53f73ba01c7c',
         '9c46dbec5d03f74352cc4a4da354b4e9796887eeb66ac292617692e765dbe400352559b16229f97b27614b51dbfbbb14613f2c10350435a8feaf53f73ba01c7a',
          true,
          false,
          NOW() 
        FROM inserted_admin;`;

    await t.raw(insertRolesSQL);
    await t.raw(insertAdministratorSQL);
  }

  try {
    await persistence.transaction(transaction);
    logger.info('Successful seeding');
    process.exit();
  } catch(error) {
    console.error(error);
    logger.error('Database error');
    logger.error(error);
    process.exit(-1);
  }
}

switch(process.argv[2]) {
  case 'clear':
    emptyDatabase(true);
    break;
  case 'initial':
    seedInitial();
    break;
  default:
    logger.warn('Available options');
    logger.warn('clear');
    logger.warn('initial');
}