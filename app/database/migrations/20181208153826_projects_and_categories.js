
exports.up = function(knex, Promise) {
  const sql = `
      CREATE TABLE
      "public"."category" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "name" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
        PRIMARY KEY ("id")
      );
      CREATE TABLE
      "public"."campaign" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "description_markdown" text COLLATE "pg_catalog"."default" NOT NULL,
        "created_at" timestamp DEFAULT now(), 
        "updated_at" timestamp DEFAULT now(),
        "deleted_at" timestamp, 
        PRIMARY KEY ("id")
      );
      CREATE TABLE
      "public"."categories_campaigns" (
        "category_id" UUID NOT NULL,
        "campaign_id" UUID NOT NULL,
        PRIMARY KEY ("category_id", "campaign_id"),
        CONSTRAINT "cc_campaign_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaign" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "cc_category_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      );
      CREATE TABLE
      "public"."campaigns_users" (
        "campaign_id" UUID NOT NULL,
        "user_id" UUID NOT NULL,
        PRIMARY KEY ("campaign_id", "user_id"),
        CONSTRAINT "cu_campaign_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaign" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "cu_user_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      );
  `;
  return knex.raw(sql);
};

exports.down = function(knex, Promise) {
  const sql = `
    DROP TABLE IF EXISTS "public"."campaigns_users" CASCADE; 
    DROP TABLE IF EXISTS "public"."categories_campaigns" CASCADE; 
    DROP TABLE IF EXISTS "public"."campaign" CASCADE; 
    DROP TABLE IF EXISTS "public"."category" CASCADE; 
  `;
  return knex.raw(sql);
};
