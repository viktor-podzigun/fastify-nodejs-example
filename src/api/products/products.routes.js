import fastify from "fastify";

/**
 * Encapsulates the routes
 * @param {fastify.FastifyInstance} app  Encapsulated Fastify Instance
 * options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function productsRoutes(app) {
  app.get("/", async (_, resp) => {
    resp.send({ hello: "world" });
  });
}

export default productsRoutes;
