const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const serverless = require("serverless-http");
const followers = require("./data/followers");
const followingData = require("./data/following");
const app = express();
const router = express.Router();
app.use(express.json());

let following = followingData.relationships_following;

router.get("/", (req, res) => {
  res.send("App is running..");
});

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);

app.get("/todos", (req, res) => {
  const hrefFolowers = followers.map((item) => item.string_list_data[0].value);
  const flwrs = new Set(hrefFolowers);
  const diff = following.filter((item) => !flwrs.has(item.title));
  const result = diff.map((item) => item.string_list_data[0].href);
  return res.json(result);
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

const bot = new TelegramBot(API_KEY_BOT, {
  polling: {
    interval: 300,
    autoStart: true,
  },
});
bot.on("polling_error", (err) => console.log(err));
bot.on("text", async (msg) => {
  console.log(msg);
});
//app.listen(3000, () => console.log("Server is running on port 3000"));
