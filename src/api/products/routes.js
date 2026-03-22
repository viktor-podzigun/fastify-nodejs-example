import crypto from "node:crypto";
import fastify from "fastify";

/**
 * @typedef {{
 *  readonly name: string;
 *  readonly description: string;
 *  readonly price: number;
 *  readonly category: string;
 *  readonly inStock: boolean;
 * }} BaseProduct
 */

/**
 * @typedef {BaseProduct & {
 *  readonly id: string;
 * }} Product
 */

/**
 * @type {fastify.RouteShorthandOptions}
 */
const postOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "description", "price", "category", "inStock"],
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number", minimum: 1 },
        category: { type: "string" },
        inStock: { type: "boolean" },
      },
    },
  },
};

/**
 * Encapsulates the routes
 * @param {fastify.FastifyInstance} app  Encapsulated Fastify Instance
 * options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function productsRoutes(app) {
  app.post("/", postOpts, async (req, resp) => {
    const data = /** @type {BaseProduct} */ (req.body);
    resp.status(201);
    resp.send({ ...data, id: crypto.randomUUID() });
  });

  app.get("/", async (_, resp) => {
    resp.send({ hello: "world" });
  });
}

export default productsRoutes;
