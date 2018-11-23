exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE "public"."security" (
      "user_id" UUID NOT NULL,
      "security" varchar(2048) COLLATE "pg_catalog"."default" NOT NULL,
      "confirmation_token" varchar(2048) COLLATE "pg_catalog"."default" NOT NULL,
      "confirmed" boolean DEFAULT false,
      "disabled" boolean DEFAULT false,
      "registered" timestamp DEFAULT now(),
      
      PRIMARY KEY ("user_id"),
      FOREIGN KEY ("user_id") REFERENCES "public"."user" ("id")
    );
    CREATE UNIQUE INDEX
      "security.confirmation_token"
    ON
      "public"."security"
    USING btree (
      "confirmation_token"
    );
  `);
};

exports.down = function(knex) {
  return knex.raw('DROP TABLE "public"."security";');
};