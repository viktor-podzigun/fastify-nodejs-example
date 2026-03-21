import fastify from "fastify";

/**
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
function build(options = {}) {
  const app = fastify(options);

  app.get("/", async function () {
    return { hello: "world" };
  });

  return app;
}

export default build;
