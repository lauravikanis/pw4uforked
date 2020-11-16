const express = require("express");
const app = express();
const port = 3600;

app.get("/", (request, response) => {
  response.send("HeWIFI is ASJKHSDGPFJDS");
});

app.listen(port, () => {
  console.log(`Passwordmanager listening at http://localhost:${port}`);
});
