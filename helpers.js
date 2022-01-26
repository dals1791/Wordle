module.exports.filterByUser = filterByUser = (messages) => {
  let data = {};
  messages.each((value, key) => {
    const { content, createdTimestamp, author, guildId } = value;
    const user = author.username;
    const isWordleScore = content.includes("Wordle") && content.includes("\n");

    if (isWordleScore && user !== "WordleBot") {
      const wordleDay = content.substring(7, 10);
      const wordleAttempts = content.substring(11, 12);
      const messageDetails = {
        attempts: wordleAttempts,
        msgId: key,
        msgCreated: createdTimestamp,
        mgContent: content,
      };

      if (!data.hasOwnProperty(guildId)) {
        data[guildId] = {
          [user]: {
            [wordleDay]: messageDetails,
          },
        };
      } else {
        if (!data[guildId].hasOwnProperty(user)) {
          data[guildId][user] = {
            [wordleDay]: messageDetails,
          };
        } else {
          if (!data[guildId][user].hasOwnProperty[wordleDay])
            data[guildId][user][wordleDay] = messageDetails;
        }
      }
    }
  });
  return data;
};

module.exports.createReply = createReply = (data, guildId) => {
  const finishedUsers = ["These", "users", "completed\nWordle", "211:\n"];
  const entries = data[guildId];
  Object.entries(entries).forEach(([key, value]) => {
    const userCompletedDay = Object.keys(value).includes("211"); // Replace with dynamic Wordle Day Variable
    if (userCompletedDay) finishedUsers.push(key + "\n");
  });

  return finishedUsers.join(" ");
};
