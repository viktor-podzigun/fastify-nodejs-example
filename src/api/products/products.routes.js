/**
 * @import { BaseProduct } from "./products.data.js"
 * @import ProductsService from "./products.service.js"
 */
import fastify from "fastify";
import { postSchema } from "./products.data.js";

/**
 * Encapsulates the routes
 * @param {fastify.FastifyInstance} app  Encapsulated Fastify Instance
 * options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function products(app) {
  /** @type {ProductsService} */
  const service = app.getDecorator("productsService");

  app.post("/", { schema: { body: postSchema } }, async (req, resp) => {
    const data = /** @type {BaseProduct} */ (req.body);
    const res = await service.create(data);
    resp.status(201);
    resp.send(res);
  });

  app.get("/", async (_, resp) => {
    resp.send({ hello: "world" });
  });
}

export default products;
