// step 1: import framework
import express from "express";
import rootRoutes from "./src/routes/root.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io"; // use for creating real time server
import { createServer } from "http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// step 2: init express object
const app = express();
const port = 8080;

// define middleware to public folder "public"
app.use(express.static("."));

// add middleware cors to allow frontend to call api to backend
app.use(
  cors({
    origin: "http://localhost:3000", // cấp quyền cho FE
    credentials: true, // cho phép FE lấy cookie và lưu vào cookie browser
  })
);

// step 3: create http server
const server = createServer(app);

// Create socketIO server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
}); // mapping server with io to create a socket io server

// listening event from client through socket
// io - object of socket server
// socket - object of socket client
// on: receive event
// emit: send event
// param of on and emit:
// param 1: event type: event of socketIO or custom event defined by user
// param 2: function
let number = 0;
io.on("connection", (socket) => {
  // BE receive emit event from client
  socket.on("send-click-increase", () => {
    console.log("send click!");
    number += 1;

    // Server send event for all client
    io.emit("send-new-number", number);
  });

  socket.on("send-click-reduce", () => {
    console.log("send click!");
    number -= 1;

    // Server send event for all client
    io.emit("send-new-number", number);
  });

  // receive event send message
  socket.on("send-message", async ({ user_id, content }) => {
    console.log({ user_id, content });

    const newChat = {
      user_id,
      content,
      date: new Date(),
    };

    // Save chat to db
    await prisma.chat.create({ data: newChat });

    // Server send to new chat to client
    io.emit("server-send-message", newChat);
  });
});

// add middleware to read JSON
app.use(express.json());

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

io.listen(8081);
