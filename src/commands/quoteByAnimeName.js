const Discord = require("discord.js");
const { getByAnimeName } = require("../../api/get-anime-quotes");

module.exports = {
  name: "quoteanime",
  description: "Gets a random quote from the given anime",
  execute(message, args) {
    const searchString = args.join(" ");
    if (!searchString)
      return message.channel.send("You have to provide an anime name!");

    getByAnimeName(searchString).then((quote) => {
      if (!quote)
        return message.channel.send(
          "Ups! I did not find any quotes for this anime"
        );
      const quoteEmbed = new Discord.MessageEmbed()
        .setColor("#4d4dff")
        .setTitle("Quote by Anime Name")
        .setDescription(quote.quote)
        .addField("Anime", quote.anime, true)
        .addField("Character", quote.character, true);
      message.channel.send(quoteEmbed);
    });
  },
};
