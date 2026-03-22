import { describe, it } from "node:test";
import { deepEqual } from "node:assert/strict";
import app from "../getApp.js";

//@ts-ignore
const port = app.server.address().port;
const productsUrl = `http://localhost:${port}/api/products`;

describe("api.products.it.js", () => {
  it("should handle GET /api/products", async () => {
    //when
    const resp = await fetch(productsUrl);

    //then
    deepEqual(resp.status, 200);
    deepEqual(await resp.json(), { hello: "world" });
  });
});
