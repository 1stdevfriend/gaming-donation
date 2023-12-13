const cors = require("cors");

const express = require("express");
const router = require("./router/index");
const { createConnectionPool } = require("./database");

const PORT = 3006;
const app = express();

app.disable("x-powered-by");
// TODO:=> In production whitelist specific host only
app.use(cors());

app.use(router);

app.listen(PORT, async () => {
  console.log(`Server listen on ${PORT}`);
  createConnectionPool();
});

module.exports = app;
