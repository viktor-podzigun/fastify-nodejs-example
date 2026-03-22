/**
 * @import { Product } from "../../src/api/products/products.data.js"
 */
import crypto from "node:crypto";
import { describe, it } from "node:test";
import { deepEqual, fail } from "node:assert/strict";
import app from "../getApp.js";

//@ts-ignore
const port = app.server.address().port;
const productsUrl = `http://localhost:${port}/api/products`;
const headers = [["Content-Type", "application/json"]];

/** @type {Product | null} */
let created = null;

describe("api.products.it.js", () => {
  describe("POST /api/products", () => {
    it("should return 400 BadRequest if name is missing", async () => {
      //when
      const resp = await fetch(productsUrl, {
        method: "POST",
        body: "{}",
        headers,
      });

      //then
      await assertBadRequest(resp, "body must have required property 'name'");
    });

    it("should return 400 BadRequest if price == 0", async () => {
      //given
      const data = {
        name: "test name",
        description: "test desc",
        price: 0,
        category: "food",
        inStock: false,
      };

      //when
      const resp = await fetch(productsUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers,
      });

      //then
      await assertBadRequest(resp, "body/price must be >= 1");
    });

    it("should store new product in db and return 201 with created info", async () => {
      //given
      const reqData = {
        name: "test name",
        description: "test desc",
        price: 123,
        category: "food",
        inStock: false,
      };

      //when
      const resp = await fetch(productsUrl, {
        method: "POST",
        body: JSON.stringify(reqData),
        headers,
      });

      //then
      created = /** @type {Product} */ (await resp.json());
      deepEqual(resp.status, 201);
      deepEqual(created.id.length, 36);
      deepEqual(created, {
        id: created.id,
        ...reqData,
      });
    });
  });

  describe("GET /api/products/:id", () => {
    it("should return 400 BadRequest if invalid uuid", async () => {
      //when
      const resp = await fetch(`${productsUrl}/123`);

      //then
      await assertBadRequest(
        resp,
        `params/id must match pattern "^(?i:[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})$"`,
      );
    });

    it("should return 404 NotFound if not existing uuid", async () => {
      //given
      const id = crypto.randomUUID();

      //when
      const resp = await fetch(`${productsUrl}/${id}`);

      //then
      await assertNotFound(resp, "Product with specified id is not found");
    });

    it("should return previously created product", async () => {
      //given
      if (!created) {
        return fail("no created product!");
      }

      //when
      const resp = await fetch(`${productsUrl}/${created.id}`);

      //then
      deepEqual(resp.status, 200);
      deepEqual(await resp.json(), created);
    });
  });

  describe("PUT /api/products/:id", () => {
    it("should return 400 BadRequest if invalid uuid", async () => {
      //given
      const reqData = { ...created, id: undefined };

      //when
      const resp = await fetch(`${productsUrl}/1-2-3`, {
        method: "PUT",
        body: JSON.stringify(reqData),
        headers,
      });

      //then
      await assertBadRequest(
        resp,
        `params/id must match pattern "^(?i:[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})$"`,
      );
    });

    it("should return 404 NotFound if not existing uuid", async () => {
      //given
      const reqData = { ...created, id: undefined };
      const id = crypto.randomUUID();

      //when
      const resp = await fetch(`${productsUrl}/${id}`, {
        method: "PUT",
        body: JSON.stringify(reqData),
        headers,
      });

      //then
      await assertNotFound(resp, "Product with specified id is not found");
    });

    it("should update previously created product", async () => {
      //given
      if (!created) {
        return fail("no created product!");
      }

      //given
      const reqData = {
        name: "updated name",
        description: "updated desc",
        price: 456,
        category: "electronics",
        inStock: true,
      };

      //when
      const resp = await fetch(`${productsUrl}/${created.id}`, {
        method: "PUT",
        body: JSON.stringify(reqData),
        headers,
      });

      //then
      const updated = /** @type {Product} */ (await resp.json());
      deepEqual(resp.status, 200);
      deepEqual(updated, { id: created.id, ...reqData });
    });
  });

  it("should handle GET /api/products", async () => {
    //when
    const resp = await fetch(productsUrl);

    //then
    deepEqual(resp.status, 200);
    deepEqual(await resp.json(), { hello: "world" });
  });
});

/**
 * @param {Response} resp
 * @param {string} message
 */
async function assertBadRequest(resp, message) {
  deepEqual(resp.status, 400);
  deepEqual(await resp.json(), {
    code: "FST_ERR_VALIDATION",
    error: "Bad Request",
    message,
    statusCode: 400,
  });
}

/**
 * @param {Response} resp
 * @param {string} error
 */
async function assertNotFound(resp, error) {
  deepEqual(resp.status, 404);
  deepEqual(await resp.json(), {
    error,
  });
}
