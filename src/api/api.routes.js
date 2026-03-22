import fastify from "fastify";
import products from "./products/routes.js";

/**
 * Encapsulates the routes
 * @param {fastify.FastifyInstance} app  Encapsulated Fastify Instance
 * options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function apiRoutes(app) {
  app.register(products, { prefix: "/products" });
}

export default apiRoutes;
