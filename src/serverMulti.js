import os from "os";
import cluster from "node:cluster";

if (cluster.isPrimary) {
  const numCPUs = os.availableParallelism() - 1;
  console.log(`Primary ${process.pid} is running, parallelism: ${numCPUs}`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  await import("./server.js");
}
