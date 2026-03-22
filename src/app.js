/**
 * @import { DatabaseSync } from "node:sqlite"
 */
import { readFile } from "fs/promises";
import fastify from "fastify";
import apiRoutes from "./api/api.routes.js";

/**
 * @param {DatabaseSync} db
 */
async function applyDbSchema(db) {
  const url = new URL("./sql/create_products.sql", import.meta.url);
  const sql = await readFile(url, { encoding: "utf8" });
  db.exec(sql);
}

/**
 * @param {object} options
 * @param {DatabaseSync} db
 */
async function build(options, db) {
  await applyDbSchema(db);

  const app = fastify(options);
  app.decorate("db", {
    getter() {
      return db;
    },
  });

  app.register(apiRoutes, { prefix: "/api" });
  return app;
}

export default build;
