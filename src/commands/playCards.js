const { drawCards } = require("../../api/generate-new-cards");

module.exports = {
  name: "draw",
  description: "draws x cards from the deck",
  async execute(message, args, client, Discord) {
    if (!args[0])
      return message.reply(
        "Please specify how many cards you wish to draw from the deck"
      );
    try {
      const cards = await drawCards(args[0]);
      let newCards = [];
      cards.cards.map((card) => {
        newCards.push(
          new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Your Draw")
            .setImage(card.image)
        );
      });
      message.channel.send(newCards);
    } catch (err) {
      message.channel.send(`💢 ${err.message} 💢`);
    }
  },
};
