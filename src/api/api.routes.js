import fastify from "fastify";
import productsRoutes from "./products/products.routes.js";

/**
 * Encapsulates the routes
 * @param {fastify.FastifyInstance} app  Encapsulated Fastify Instance
 * options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function apiRoutes(app) {
  app.register(productsRoutes, { prefix: "/products" });
}

export default apiRoutes;
