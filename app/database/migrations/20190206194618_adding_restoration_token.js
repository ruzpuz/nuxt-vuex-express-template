exports.up = function(knex) {
  const sql = `
    ALTER TABLE
      "public"."security"
    ADD
      "restoration_token" varchar(2048) COLLATE "pg_catalog"."default" DEFAULT NULL;
    CREATE UNIQUE INDEX
      "security.restoration_token"
    ON
      "public"."security"
    USING btree (
      "restoration_token"
    );
  `;
  return knex.raw(sql);
};

exports.down = function(knex) {
  const sql = `
    ALTER TABLE 
      "public"."security"
    DROP COLUMN 
      restoration_token;
  `;
  return knex.raw(sql);
};
