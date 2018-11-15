const databaseService = require('app/database/database.service');
async function getRoles() {
  const database = databaseService.get().persistence;

  const result = await database.raw(`
    SELECT * FROM "public"."role"
  `);
  return result.rows;
}
module.exports = {
  getRoles
};