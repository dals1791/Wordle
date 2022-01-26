require("dotenv").config();
const { filterByUser, createReply } = require("./helpers.js");

const { Client, Intents, Collection } = require("discord.js");
const {
  FLAGS: { GUILDS, GUILD_MESSAGES },
} = Intents;
const client = new Client({
  intents: [GUILDS, GUILD_MESSAGES],
});

const TOKEN = process.env.BOT_TOKEN;
console.log();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  const channel = msg.channel;
  const guild = msg.guildId;

  if (msg.author.bot) return;
  if (msg.content.includes("Wordle")) {
    channel.messages
      .fetch()
      .then(async (messages) => {
        const data = filterByUser(messages);
        return createReply(data, guild);
      })
      .then(async (reply) => console.log(reply))
      .catch(console.error());
  }
});

client.login(TOKEN);
