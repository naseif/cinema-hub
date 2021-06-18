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
        .addField("Character", quote.character, true)
        .setTimestamp()
        .setFooter(
          "Created by naseif",
          "https://i.imgur.com/B6HSkNo.png",
          "https://github.com/naseif"
        );
      message.channel.send(quoteEmbed);
    });
  },
};
