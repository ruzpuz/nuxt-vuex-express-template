const databaseService = require('app/database/database.service')
async function getCategories() {
  const database = databaseService.get().persistence;

  const result = await database.raw(`
    SELECT * FROM "public"."category"
  `);
  return result.rows;
}
module.exports = {
  getCategories
}