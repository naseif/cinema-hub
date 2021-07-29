const { drawCards } = require("../../api/generate-new-cards");

module.exports = {
  name: "draw",
  description: "draws x cards from the deck",
  async execute(message, args, client, Discord) {
    if (!args[0])
      return message.reply(
        "Please specify how many cards you wish to draw from the deck"
      );
    console.log(await drawCards(args[0]));
  },
};
