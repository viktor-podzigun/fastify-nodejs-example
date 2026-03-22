/**
 * @import { BaseProduct } from "./data.js"
 */
import crypto from "node:crypto";
import fastify from "fastify";
import { postSchema } from "./data.js";

/**
 * Encapsulates the routes
 * @param {fastify.FastifyInstance} app  Encapsulated Fastify Instance
 * options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function products(app) {
  app.post("/", { schema: { body: postSchema } }, async (req, resp) => {
    const data = /** @type {BaseProduct} */ (req.body);
    resp.status(201);
    resp.send({ ...data, id: crypto.randomUUID() });
  });

  app.get("/", async (_, resp) => {
    resp.send({ hello: "world" });
  });
}

export default products;
