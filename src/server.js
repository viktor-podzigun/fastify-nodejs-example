import DbWrapper from "./DbWrapper.js";
import app from "./app.js";

const server = await app(
  {
    logger: {
      level: "info",
    },
  },
  new DbWrapper(process.env.DB_NAME ?? ".db"),
);

/**
 * Run the server!
 */
const start = async () => {
  try {
    //load .env file
    process.loadEnvFile();

    const port = parseInt(process.env.APP_PORT ?? "3000");

    await server.listen({ port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

await start();
