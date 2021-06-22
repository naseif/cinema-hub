const getAnimedetails = require("../../api/get-anime-details");

module.exports = {
  name: "san",
  description: "searches animes from myanimelist database ",
  execute(message, args, client, Discord) {
    const searchString = args.join(" ");
    if (!searchString)
      return message.channel.send("You have to provide an anime name!");

    getAnimedetails(searchString).then((animedata) => {
      if (!animedata)
        return message.channel.send("I did not find any anime with this name!");

      const user = message.mentions.users.first() || message.author;
      const infoEmbed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle(`${animedata.titlerom} AKA ${animedata.titleeng}`)
        .setURL(`https://myanimelist.net/anime/${animedata.malid}`)
        .setAuthor(`${user.username}`)
        .setDescription(animedata.synopsis)
        .setThumbnail("https://i.imgur.com/KFaAO2d.png")
        .addFields(
          {
            name: "Status",
            value: `${animedata.status}`,
          },
          {
            name: "Rating",
            value: `${animedata.rating}`,
            inline: true,
          },
          {
            name: "Score/Rank",
            value: `${animedata.score}/${animedata.rank}`,
            inline: true,
          },
          {
            name: "Premiered",
            value: animedata.premiered,
            inline: true,
          }
        )
        .addField(
          "Episodes Number",
          `${animedata.episodes ? animedata.episodes : "Unknown"}`,
          true
        )
        .addField(
          "Aired",
          `${animedata.aired ? animedata.aired : "Unknown"}`,
          true
        )
        .addField("Genres", animedata.genres.join(" - "), true)
        .setImage(animedata.imageUrl)
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
