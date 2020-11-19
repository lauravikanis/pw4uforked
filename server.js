require("dotenv").config();

const express = require("express");

const path = require("path");

const { getPassword, setPassword, deletePassword } = require("./lib/passwords");
const { connect } = require("./lib/database");

const app = express();
app.use(express.json());
const port = process.env.port || 3600;

app.get("/passwords/:name", async (request, response) => {
  const { name } = request.params;
  try {
    const passwordValue = await getPassword(name);

    if (!passwordValue) {
      response
        .status(404)
        .send("could not find the passwords you are looking for");
      return;
    }
    response.send(passwordValue);
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal Server error");
  }
});

app.post("/passwords", async (request, response) => {
  // response.send("Under construction");
  const password = request.body;

  try {
    await setPassword(password.name, password.value);
    response.send(`Successfully set ${password.name}`);
  } catch (error) {
    console.error(error);
    response.status(500).send("Unexpected error. PLease try again later");
  }
});

app.delete("/passwords/:passwordName", async (request, response) => {
  try {
    const { passwordName } = request.params;
    const result = await deletePassword(passwordName);
    if (result.deletedCount === 0) {
      return response.status(404).send("Couldn't find password");
    }
    response.status(200).send("Password deleted");
  } catch (error) {
    console.error(error);
    response.status(500).send("Unexpected error. PLease try again later");
  }
});

app.use(express.static(path.join(__dirname, "client/build")));

app.use(
  "/storybook",
  express.static(path.join(__dirname, "client/storybook-static"))
);

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
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
