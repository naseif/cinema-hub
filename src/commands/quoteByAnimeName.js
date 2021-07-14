const { getByAnimeName } = require("../../api/get-anime-quotes");

module.exports = {
  name: "quoteanime",
  description: "Gets a random quote from the given anime",
  execute(message, args, client, Discord) {
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
