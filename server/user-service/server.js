import http from "http";
import index from "./index.js";
import "dotenv/config.js";

const port = process.env.PORT || 3001;

const server = http.createServer(index);

console.log("User Service - Starting on Port:", port);

server.listen(port);
