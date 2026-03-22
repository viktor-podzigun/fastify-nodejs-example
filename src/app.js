/**
 * @import DbWrapper from "./DbWrapper.js"
 */
import { readFile } from "fs/promises";
import fastify from "fastify";
import apiRoutes from "./api/api.routes.js";

/**
 * @param {DbWrapper} db
 */
async function applyDbSchema(db) {
  const url = new URL("./sql/create_products.sql", import.meta.url);
  const sql = await readFile(url, { encoding: "utf8" });
  db.exec(sql);
}

/**
 * @param {object} options
 * @param {DbWrapper} db
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
