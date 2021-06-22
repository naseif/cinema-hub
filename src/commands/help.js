const commands = require("../main");
const { prefix } = require("../../config.json");
module.exports = {
  name: "help",
  description: "Shows all commands",
  execute(message, args, client, Discord) {
    const user = message.mentions.users.first() || message.author;
    let help = [];
    for (let key of commands.commands) {
      help.push(`${prefix}${key[1].name} - ${key[1].description}`);
    }
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#15b9d6")
        .setTitle("Commands Options")
        .setTitle("A list of all Commands")
        .setDescription(help)
        .setTimestamp()
        .setFooter(
          "Created by naseif",
          "https://i.imgur.com/B6HSkNo.png",
          "https://github.com/naseif"
        )
    );
  },
};
