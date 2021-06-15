const Discord = require("discord.js");
const { getRandomQuotes } = require("../../api/get-anime-quotes");

module.exports = {
  name: "quote",
  description: "Get a random anime quote!",
  execute(message, args) {
    getRandomQuotes().then((quote) => {
      const quoteEmbed = new Discord.MessageEmbed()
        .setColor("#ff751a")
        .setTitle("Random Anime Quote")
        .setDescription(quote.quote)
        .addField("Anime", quote.anime, true)
        .addField("Character", quote.character, true);
      message.channel.send(quoteEmbed);
    });
  },
};
