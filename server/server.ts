/* eslint-disable no-console */
import mongoose from "mongoose";
import { Server, createServer } from "http";
import app from "./app";
import config from "./config";
import { Redis } from "ioredis";
import { initSocket } from "./socketServer";

let server: Server;
let socketServer = createServer(app);
initSocket(socketServer);

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("🚀 Database connected succesfully");

    server = socketServer.listen(config.port, () => {
      console.log(`🚀 Application listening on port ${config.port}`);
    });
  } catch (error) {
    setTimeout(bootstrap, 5000);
    console.log("❌ Failed to connect database", error);
  }
  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

const redisClient = () => {
  if (config.redis) {
    console.log(`🚀 Redis Connected`);

    return config.redis;
  }
  throw new Error("Redis connection failed");
};

export const redis = new Redis(redisClient());

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
