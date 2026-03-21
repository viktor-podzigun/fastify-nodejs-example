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
await app.listen();
//@ts-ignore
const port = app.server.address().port;

describe("app.test.js", () => {
  it("should handle GET /", async () => {
    //when
    const resp = await fetch(`http://localhost:${port}`);

    //then
    deepEqual(resp.status, 200);
    deepEqual(await resp.json(), { hello: "world" });
  });

  it("should stop app server", async () => {
    //cleanup
    await app.close();
  });
});
