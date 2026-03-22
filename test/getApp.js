import DbWrapper from "../src/DbWrapper.js";
import build from "../src/app.js";

const app = await build({}, new DbWrapper(":memory:"));
await app.listen();

export default app;
