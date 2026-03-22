/**
 * @import { Product } from "../../src/api/products/routes.js"
 */
import { describe, it } from "node:test";
import { deepEqual } from "node:assert/strict";
import app from "../getApp.js";

//@ts-ignore
const port = app.server.address().port;
const productsUrl = `http://localhost:${port}/api/products`;
const headers = [["Content-Type", "application/json"]];

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

    it("should store new product in db and return 201 with saved data", async () => {
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
      const resDdata = /** @type {Product} */ (await resp.json());
      deepEqual(resp.status, 201);
      deepEqual(resDdata.id.length, 36);
      deepEqual(resDdata, {
        id: resDdata.id,
        ...reqData,
      });
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
