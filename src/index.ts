import express, { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./resolvers/resolvers";
import "dotenv/config";
import router from "./router/router";
import cookieParser from "cookie-parser";
import cors from "cors";
import chalk from "chalk";

import { Server } from "socket.io";
import HTTP from "http";
import connectDB from "./config/db";
// import { mainSocketManager } from "./sockets/mainSocket";

const app: Express = express();
const server = HTTP.createServer(app);
connectDB();

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

// mainSocketManager(io);

// server.listen(process.env.PORT || 8000, () => {
//   console.log(
//     chalk.blue(`Listening on: http://localhost:${process.env.PORT || 8000}`)
//   );
// });
app.listen(process.env.PORT || 8000, () => {
  console.log(
    chalk.blue(`Listening on: http://localhost:${process.env.PORT || 8000}`)
  );
});

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
