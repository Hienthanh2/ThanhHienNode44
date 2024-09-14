import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res, nextFunc) => {
  res.status(200).json("Hello world!"); // define response status
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
