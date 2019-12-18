import express from "express";
import next from "next";
import path from "path";

import routes from "../routes";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "." });
const handle = routes.getRequestHandler(app);

function createServer(): any {
  const server = express();
  server.get("*", (req, res) => {
    handle(req, res);
  });
  return server;
}

const server = createServer();

app.prepare().then(() => {
    server.listen(port);
});
