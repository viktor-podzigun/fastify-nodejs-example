import app from "./app.js";

const server = app({
  logger: {
    level: "info",
  },
});

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

start();
