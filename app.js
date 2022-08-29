import express from "express";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());
const tweets = [];
const users = [];

server.get("/tweets", (req, res) => {
  const infoTweets = [...tweets];
  const page = req.query.page;
  if (page >= 1) {
    infoTweets.reverse();
    infoTweets.forEach(
      (elem) =>
        (elem.avatar = users.find((e) => e.username === elem.username).avatar)
    );
    return res.send(
      infoTweets.filter(
        (e, index) => index >= `${page - 1}0` && index < `${page}0`
      )
    );
  }
  res.send("Informe uma paǵina válida!").status(400);
});
server.get("/tweets/:USERNAME", (req, res) => {
  if (users.filter((e) => e.username === req.params.USERNAME).length === 0) {
    return res.status(400).send("Usuário não encontrado");
  }
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
  if (user.avatar.slice(0, 8) !== "https://") {
    return res.status(400).send("Informe um formato válido de imagem");
  }
  users.push(user);
  res.status(201).send("OK");
});
server.post("/tweets", (req, res) => {
  const user = req.headers.user;
  const tweet = req.body.tweet;
  if (!user || !tweet) {
    return res.status(400).send("Todos os campos são obrigatórios");
  }
  tweets.push({ username: user, tweet: tweet });
  res.status(201).send("OK");
});
server.listen(5000, () => {
  console.log("Listening on port 5000");
});
