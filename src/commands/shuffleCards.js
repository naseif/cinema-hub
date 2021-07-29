const { reshuffleCards } = require("../../api/generate-new-cards");

module.exports = {
  name: "shuffle",
  description: "Shuffle the existing deck ",
  async execute(message, args, client, Discord) {
    await reshuffleCards();
    message.channel.send("Cards have been shuffled.");
  },
};
