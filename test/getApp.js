import { DatabaseSync } from "node:sqlite";
import build from "../src/app.js";

const app = await build({}, new DatabaseSync(":memory:"));
await app.listen();

export default app;
