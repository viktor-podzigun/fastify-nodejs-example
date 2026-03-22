import fastify from "fastify";
import apiRoutes from "./api/api.routes.js";

/**
 * @param {Object} options
 */
function build(options = {}) {
  const app = fastify(options);
  app.register(apiRoutes, { prefix: "/api" });
  return app;
}

export default build;
