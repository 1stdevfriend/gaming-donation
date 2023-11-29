const cors = require("cors");

const express = require("express");
const router = require("./router/index");
const { createConnectionPool } = require("./database/helpers");

const PORT = 3000;
const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(PORT, async () => {
  console.log(`Server listen on ${PORT}`);
  createConnectionPool();
});

module.exports = app;