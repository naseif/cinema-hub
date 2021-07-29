const { generateDeck } = require("../../api/generate-new-cards");

module.exports = {
  name: "cdeck",
  description: "Generates up to 6 decks, default is 1. e.g `cdeck 3` ",
  async execute(message, args, client, Discord) {
    if (args[0]) {
      await generateDeck(args[0]);
      message.reply(
        `${args[0]} Deck/s has/have been generated, You can now start playing`
      );
    }
    await generateDeck();
    message.reply(`1 Deck has been generated, You can start playing!`);
  },
};
