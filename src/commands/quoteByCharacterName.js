const { getQuoteByCharacterName } = require("../../api/get-anime-quotes");

module.exports = {
  name: "quotechar",
  description: "Gets a random quote from the given character name",
  execute(message, args, client, Discord) {
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
