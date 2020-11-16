require("dotenv").config();

const express = require("express");
const { getPassword } = require("./lib/passwords");
const { connect } = require("./lib/database");

const app = express();
const port = 3600;

//route zu "passwords/:name"

app.get("/passwords/:name", async (request, response) => {
  const { name } = request.params;
  const passwordValue = await getPassword(name);
  response.send(passwordValue);
});

app.post("/passwords", (request, response) => {
  response.send("Under construction");
});

async function run() {
  console.log("Connecting to database...");
  await connect(process.env.MONGO_DB_URI, process.env.MONGO_DB_NAME);
  console.log("Connected to database 🎉");

  app.listen(port, () => {
    console.log(`PW4U API listening at http://localhost:${port}`);
  });
}

run();
