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
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
