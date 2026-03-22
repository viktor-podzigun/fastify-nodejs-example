/**
 * @import { FastifyInstance } from "fastify"
 */

import { describe, it } from "node:test";

describe("app.test.js", async () => {
  /** @type {FastifyInstance | null} */
  let app = null;

  it("should start app server", async () => {
    //given
    app = (await import("./getApp.js")).default;
  });

  describe("integration-tests", async () => {
    await import("./api/api.products.it.js");
  });

  it("should stop app server", async () => {
    //cleanup
    await app?.close();
  });
});
