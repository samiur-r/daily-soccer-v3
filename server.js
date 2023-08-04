const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const cron = require("node-cron");
const WebSocket = require("ws");

const detectFileChange = require("./src/utils/detectFileChange");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

let wsServer;

const sendNotificationToClients = () => {
  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "file_change" }));
    }
  });
};

cron.schedule("*/30 * * * *", async () => {
  const isFileChanged = await detectFileChange();
  if (isFileChanged) sendNotificationToClients();
});

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  wsServer = new WebSocket.Server({ server });

  wsServer.on("connection", (ws) => {
    console.log("WebSocket client connected");
  });

  server.once("error", (err) => {
    console.error(err);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
