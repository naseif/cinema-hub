const { TMDb } = require("../../config.json");

module.exports = {
  name: "stv",
  description: "searches tv shows from the imdb database ",
  execute(message, args, client, Discord) {
    if (!TMDb)
      return message.channel.send(
        "Your TMDb key is not defined in config.json!"
      );

    let infoObject = [];
    const searchString = args.join(" ");
    if (!searchString)
      return message.channel.send("You have to provide a Show name!");

    fullInfo.then((data) => {
      const user = message.mentions.users.first() || message.author;
      const infoEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`${data[0].title} (${data[0].year})`)
        .setURL(`https://www.imdb.com${data[0].id}`)
        .setAuthor(`${user.username}`)
        .setDescription(data[1].plot)
        // .setDescription(data[1].genres)
        .setThumbnail("https://i.imgur.com/gfwmBoM.png")
        .addFields(
          {
            name: "Seasons",
            value: `${data[2].seasons ? data[2].seasons : "Movie"}`,
          },
          {
            name: "Rating",
            value: `${data[1].rating ? data[1].rating : "Not aired yet!"}`,
            inline: true,
          },
          {
            name: "Series End Year",
            value: `${
              data[0].seriesEndYear ? data[0].seriesEndYear : "Unknown"
            }`,
            inline: true,
          },
          {
            name: "Type",
            value: data[0].type,
            inline: true,
          }
        )
        .addField(
          "Episodes Number",
          `${data[0].episodesNumber ? data[0].episodesNumber : "Unknown"}`,
          true
        )
        .addField("Genres", data[1].genres.join(" - "), true)

        .setImage(data[0].imageUrl)
        .setTimestamp()
        .setFooter(
          "Created by naseif",
          "https://i.imgur.com/B6HSkNo.png",
          "https://github.com/naseif"
        );

      message.channel.send(infoEmbed);
    });
  },
};
