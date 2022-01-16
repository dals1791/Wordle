require("dotenv").config();

const Discord = require("discord.js");
const { Client, Intents } = Discord
const {
  FLAGS: { GUILDS, GUILD_MESSAGES },
} = Intents;
const client = new Client({ 
  intents: [
    GUILDS,
    GUILD_MESSAGES
  ] 
  });

const TOKEN = process.env.BOT_TOKEN;
console.log()
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


const summarizeWordleScoresByUser = (messages) => {
  let data = {};
  messages.each((value, key) => {
    const {content, createdTimestamp, author} = value
    const user = author.username
    const isWordleScore = content.includes("Wordle") && content.includes("\n")

    if (isWordleScore) {
      const wordleDay = content.substring(7, 10)
      const wordleAttempts = content.substring(11, 12)
      const messageDetails =  {
          attempts: wordleAttempts,
          msgId: key,
          msgCreated: createdTimestamp,
          mgContent: content
      }
      if (!data.hasOwnProperty(user)) {
        data[user] = {
          [wordleDay]: messageDetails
        }
      } else {
        if (!data[user].hasOwnProperty[wordleDay]) data[user][wordleDay] = messageDetails
      }
    }
  })

  return data
}

const createReply = (data, channel) => {
  const finishedUsers = ["These", "users", "completed\nWordle", "211:\n"]
  Object.entries(data).forEach(([key, value]) => {
      const userCompletedDay = Object.keys(value).includes("211") // Replace with dynamic Wordle Day Variable
      if (userCompletedDay) finishedUsers.push(key + "\n")
  })

  return finishedUsers.join(" ")
}

client.on('messageCreate', msg => {
  const channel = msg.channel

  if (msg.author.bot) return;
  if (msg.content.includes('Wordle')) {
    channel.messages.fetch().then(async (messages) => {
      let data = summarizeWordleScoresByUser(messages)
      return createReply(data)
    }).then(async (reply) => channel.send(reply)).catch(console.error())
  }

})

client.login(TOKEN);
