const { Collection } = require("discord.js");
const { filterByUser } = require("./helpers");

module.exports.fetchHistory = async function fetchHistory(channel) {
  if (!channel) {
    throw new Error(`Expected channel, got ${typeof channel}.`);
  }
  const wordleStartDate = 1633046400;
  let collection = new Collection();
  let lastId = null;
  let options = { limit: 100 };
  let lastDate = new Date().getTime();
  let areThereMessages = true;
  let messages;

  while (areThereMessages) {
    if (lastDate < wordleStartDate) return;
    if (lastId) {
      options.before = lastId;
    }

    messages = await channel.messages.fetch(options);

    if (messages.size > 0) {
      collection = collection.concat(messages);
      lastDate = messages.last().createdTimestamp;
      lastId = messages.last().id;
    } else {
      areThereMessages = false;
    }
  }
  return collection;
};
