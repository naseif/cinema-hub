const Discord = require("discord.js");
const getRandomFact = require("../../api/get-anime-fact");

module.exports = {
  name: "animefact",
  description: "Gets a random fact about anime!",
  execute(message, args) {
    getRandomFact().then((fact) => {
      console.log(fact);
      if (!fact)
        return message.channel.send(
          "Sorry, there are no available facts at the moment!"
        );
      const factEmbed = new Discord.MessageEmbed()
        .setColor("#ffcc00")
        .setTitle("Facts about Anime")
        .setDescription(fact.fact);
      message.channel.send(factEmbed);
    });
  },
};
