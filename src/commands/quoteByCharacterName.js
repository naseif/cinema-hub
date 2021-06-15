const Discord = require("discord.js");
const { getQuoteByCharacterName } = require("../../api/get-anime-quotes");

module.exports = {
  name: "quotechar",
  description: "Gets a random quote from the given character name",
  execute(message, args) {
    const searchString = args.join(" ");
    if (!searchString)
      return message.channel.send("You have to provide an anime name!");

    getQuoteByCharacterName(searchString).then((quote) => {
      if (!quote)
        return message.channel.send(
          "Ups! I did not find any quotes for this character"
        );
      const quoteEmbed = new Discord.MessageEmbed()
        .setColor("#d24dff")
        .setTitle("Quote by Character Name")
        .setDescription(quote.quote)
        .addField("Anime", quote.anime, true)
        .addField("Character", quote.character, true);
      message.channel.send(quoteEmbed);
    });
  },
};
