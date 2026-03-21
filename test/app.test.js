import { deepEqual } from "node:assert/strict";
import build from "../src/app.js";

const { describe, it } = await (async () => {
  // @ts-ignore
  const module = process.isBun ? "bun:test" : "node:test";
  // @ts-ignore
  return process.isBun // @ts-ignore
    ? Promise.resolve({ describe: (_, fn) => fn(), it: test })
    : import(module);
})();

const app = build();

describe("app.test.js", () => {
  it("should handle GET /", async () => {
    //when
    const resp = await app.inject({
      method: "GET",
      url: "/",
    });

    //then
    deepEqual(resp.statusCode, 200);
    deepEqual(resp.body, `{"hello":"world"}`);
  });
});
