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

module.exports.calcWordleDay = calcWordleDay = () => {
  const wordleStartingDay = 240;
  const wordleStartDate = Math.floor(
    new Date(2022, 1, 14).getTime() / (1000 * 60 * 60 * 24)
  );
  const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const day = wordleStartingDay + Math.floor(today - wordleStartDate) - 1;
  return day;
};

module.exports.createReply = createReply = (data, guildId) => {
  const wordleDay = this.calcWordleDay();
  let finishedUsers = [
    "These",
    "users",
    "completed\nWordle",
    `${wordleDay}:\n`,
  ];
  const entries = data[guildId];
  Object.entries(entries).forEach(([key, value]) => {
    const userCompletedDay = Object.keys(value).includes(parseInt(wordleDay));

    if (userCompletedDay) {
      finishedUsers.push(key + "\n");
    } else {
      finishedUsers = ["No one has completed the Wordle today"];
    }
  });

  return finishedUsers.join(" ");
};
