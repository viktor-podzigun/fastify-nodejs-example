/**
 * @import { BaseProduct } from "./products.data.js"
 * @import ProductsService from "./products.service.js"
 */
import fastify from "fastify";
import {
  paramsSchema,
  postSchema,
  getSchema,
  errorSchema,
} from "./products.data.js";

/**
 * Encapsulates the routes
 * @param {fastify.FastifyInstance} app  Encapsulated Fastify Instance
 * options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function products(app) {
  /** @type {ProductsService} */
  const service = app.getDecorator("productsService");

  app.post(
    "/",
    {
      schema: {
        body: postSchema,
        response: { 201: getSchema },
      },
    },
    async (req, resp) => {
      const data = /** @type {BaseProduct} */ (req.body);
      const res = await service.create(data);
      resp.status(201).send(res);
    },
  );

  app.put(
    "/:id",
    {
      schema: {
        params: paramsSchema,
        body: postSchema,
        response: { 200: getSchema, 404: errorSchema },
      },
    },
    async (req, resp) => {
      const params = /** @type {any} */ (req.params);
      if (!(await service.getById(params.id))) {
        resp
          .status(404)
          .send({ error: "Product with specified id is not found" });
        return;
      }

      const data = /** @type {BaseProduct} */ (req.body);
      const res = await service.update(params.id, data);
      resp.send(res);
    },
  );

  app.delete(
    "/:id",
    {
      schema: {
        params: paramsSchema,
        response: { 204: getSchema, 404: errorSchema },
      },
    },
    async (req, resp) => {
      const params = /** @type {any} */ (req.params);
      if (!(await service.getById(params.id))) {
        resp
          .status(404)
          .send({ error: "Product with specified id is not found" });
        return;
      }

      await service.delete(params.id);
      resp.status(204).send("");
    },
  );

  app.get(
    "/:id",
    {
      schema: {
        params: paramsSchema,
        response: { 200: getSchema, 404: errorSchema },
      },
    },
    async (req, resp) => {
      const params = /** @type {any} */ (req.params);
      const res = await service.getById(params.id);
      if (!res) {
        resp
          .status(404)
          .send({ error: "Product with specified id is not found" });
        return;
      }

      resp.send(res);
    },
  );

  app.get(
    "/",
    {
      schema: {
        params: paramsSchema,
        response: { 200: { type: "array", items: getSchema } },
      },
    },
    async (_, resp) => {
      const res = await service.getAll();
      resp.send(res);
    },
  );
}

export default products;
