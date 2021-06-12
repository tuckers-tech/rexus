const express = require("express");
const path = require("path");

async function startService() {
  const app = express();

  app.use(express.static(path.join(__dirname, "..", "static")));

  app.use("/", (req, res) => {
    res.sendFile("index.html");
  });

  return app;
}

module.exports = {
  startService
};
