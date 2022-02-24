require("dotenv").config();
const { filterByUser, createReply } = require("./helpers.js");
const { fetchHistory } = require("./fetchHistory");

const { Client, Intents } = require("discord.js");
const {
  FLAGS: { GUILDS, GUILD_MESSAGES },
} = Intents;
const client = new Client({
  intents: [GUILDS, GUILD_MESSAGES],
});

const TOKEN = process.env.BOT_TOKEN;
const timeHours = new Date().getHours();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  const channel = msg.channel;
  const guild = msg.guildId;

  if (msg.author.bot) return;
  if (msg.content.includes("Wordle") || timeHours == 0) {
    fetchHistory(channel)
      .then(async (messages) => {
        const data = filterByUser(messages);
        return createReply(data, guild);
      })
      .then((reply) => {
        channel.send(reply);
      })
      .catch((err) => console.log(err));
  }
});

client.login(TOKEN);
