// step 1: import framework
import express from "express";

// step 2: init express object
const app = express();
const port = 8080;

// add middleware to read JSON
app.use(express.json());

// define routes
app.get("/", (req, res) => {
  res.send("Hello node 44!");
});

app.get("/test", (req, res) => {
  res.send("test!");
});

// demo get param and body from url
app.post("/users/:id/:username", (req, res) => {
  const params = req.params;
  const body = req.body;

  const { id, username } = params;

  res.send({ id, username });
});

// demo get query from url
app.get("/test-query", (req, res) => {
  let query = req.query;
  res.send(query);
});

// demo get header from request
app.get("/test-header", (req, res) => {
  let headers = req.headers;
  res.send(headers);
});

// step 3: init server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
