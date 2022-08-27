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

server.post("/sign-up", (req, res) => {
  const user = req.body;
  users.push(user);
  res.send("OK");
});
server.post("/tweets", (req, res) => {
  const tweet = req.body;
  tweets.push(tweet);
  res.send("OK");
});
server.listen(5000, () => {
  console.log("Listening on port 5000");
});
