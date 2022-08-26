import express from "express";
import cors from "cors";

const server = express();
server.use(express.json());

const tweets = [];
const users = [];

server.get("/tweets", (req, res) => {
  const infoUsers = [...users];
  infoUsers.reverse();
  res.send(infoUsers.filter((e, index) => index <= 9));
});

server.post("/sign-up", (req, res) => {
  const user = req.body;
  users.push(user);
  res.send(users);
});
server.listen(5000, () => {
  console.log("Listening on port 5000");
});
