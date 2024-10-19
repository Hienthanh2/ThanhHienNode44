// step 1: import framework
import express from "express";
import rootRoutes from "./src/routes/root.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// step 2: init express object
const app = express();
const port = 8080;

// define middleware to public folder "public"
app.use(express.static("."));

// add middleware to read JSON
app.use(express.json());

// add middleware cors to allow frontend to call api to backend
app.use(
  cors({
    origin: "http://localhost:3000", // cấp quyền cho FE
    credentials: true, // cho phép FE lấy cookie và lưu vào cookie browser
  })
);

// add middleware to read cookie from request
app.use(cookieParser());

// import root routes
app.use(rootRoutes);

// define routes
app.get("/", (req, res) => {
  res.send("Hello node 44!");
});

app.get("/test", (req, res) => {
  res.send("test!");
});

// demo get param and body from url
// app.post("/users/:id/:username", (req, res) => {
//   const params = req.params;
//   const body = req.body;

//   const { id, username } = params;

//   res.send({ id, username });
// });

// when interacting with db, need to use async and await
// app.get("/users", async (req, res) => {
//   try {
//     const [data, additionalInfo] = await pool.query("SELECT * FROM users");

//     res.status(OK_STATUS).json({ data, additionalInfo });
//   } catch (err) {
//     res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: err });
//   }
// });

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
