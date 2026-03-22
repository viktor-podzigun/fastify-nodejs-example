/**
 * @import DbWrapper from "./DbWrapper.js"
 */
import { readFile } from "fs/promises";
import fastify from "fastify";
import ProductsDao from "./api/products/products.dao.js";
import ProductsService from "./api/products/products.service.js";
import apiRoutes from "./api/api.routes.js";

/**
 * @param {object} options
 * @param {DbWrapper} db
 */
async function build(options, db) {
  await applyDbSchema(db);

  const app = fastify(options);
  decorate(app, db);

  app.register(apiRoutes, { prefix: "/api" });
  return app;
}

/**
 * @param {fastify.FastifyInstance} app
 * @param {DbWrapper} db
 */
function decorate(app, db) {
  const productsDao = new ProductsDao(db);
  const productsService = new ProductsService(productsDao);

  app.decorate("db", {
    getter() {
      return db;
    },
  });
  app.decorate("productsDao", {
    getter() {
      return productsDao;
    },
  });
  app.decorate("productsService", {
    getter() {
      return productsService;
    },
  });
}

/**
 * @param {DbWrapper} db
 */
async function applyDbSchema(db) {
  const url = new URL("./sql/create_products.sql", import.meta.url);
  const sql = await readFile(url, { encoding: "utf8" });
  db.exec(sql);
}

export default build;
