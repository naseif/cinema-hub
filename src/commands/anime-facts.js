const getRandomFact = require("../../api/get-anime-fact");

module.exports = {
  name: "animefact",
  description: "Gets a random fact about anime!",
  execute(message, args, client, Discord) {
    getRandomFact().then((fact) => {
      if (!fact)
        return message.channel.send(
          "Sorry, there are no available facts at the moment!"
        );
      const factEmbed = new Discord.MessageEmbed()
        .setColor("#ffcc00")
        .setTitle("Facts about Anime")
        .setDescription(fact.fact)
        .setTimestamp()
        .setFooter(
          "Created by naseif",
          "https://i.imgur.com/B6HSkNo.png",
          "https://github.com/naseif"
        );
      message.channel.send(factEmbed);
    });
  },
};
