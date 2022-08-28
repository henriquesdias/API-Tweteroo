import express from "express";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());
const tweets = [];
const users = [];

server.get("/tweets", (req, res) => {
  const infoTweets = [...tweets];
  infoTweets.reverse();
  infoTweets.forEach(
    (elem) =>
      (elem.avatar = users.find((e) => e.username === elem.username).avatar)
  );
  res.send(infoTweets.filter((e, index) => index <= 9));
});
server.get("/tweets/:USERNAME", (req, res) => {
  const infoTweets = [...tweets].filter(
    (e) => e.username === req.params.USERNAME
  );
  infoTweets.reverse();
  infoTweets.forEach(
    (elem) =>
      (elem.avatar = users.find((e) => e.username === elem.username).avatar)
  );
  res.send(infoTweets.filter((e, index) => index <= 9));
});

server.post("/sign-up", (req, res) => {
  const user = req.body;
  if (!user.username || !user.avatar) {
    return res.status(400).send("Todos os campos são obrigatórios");
  }
  users.push(user);
  return res.status(201).send("OK");
});
server.post("/tweets", (req, res) => {
  const user = req.headers.user;
  const tweet = req.body.tweet;
  if (!user || !tweet) {
    return res.status(400).send("Todos os campos são obrigatórios");
  }
  tweets.push(tweet);
  return res.send("OK").status(201);
});
server.listen(5000, () => {
  console.log("Listening on port 5000");
});
