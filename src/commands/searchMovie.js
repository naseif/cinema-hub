const { TMDb } = require("../../config.json");
module.exports = {
  name: "sm",
  description: "searches for movies from the imdb database ",
  execute(message, args, clinet, Discord) {
    if (!TMDb)
      return message.channel.send(
        "Your RapidAPI key is not defined in config.json!"
      );
    let infoObject = [];
    const searchString = args.join(" ");
    if (!searchString)
      return message.channel.send("You have to provide a Movie name!");
    const fullInfo = getIdAndGenInfo
      .getFind(searchString)
      .then((info) => {
        infoObject.push(info);
        const id = info.id.slice(7, -1);
        return getPlotAndGenres.getGenresAndPlot(id);
      })
      .then((data) => {
        infoObject.push({
          plot: data.plot,
          genres: data.genres,
          rating: data.rating,
        });
        const id = infoObject[0].id.slice(7, -1);
        return getSeason.getSeasons(id);
      })
      .then((seasons) => {
        infoObject.push({ seasons: seasons.length });
        return infoObject;
      })
      .catch((err) => {
        console.log(err);
      });

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
            name: "Genres",
            value: `${data[1].genres.join(" - ")}`,
          },
          {
            name: "Rating",
            value: `${data[1].rating ? data[1].rating : "Not aired yet!"}`,
            inline: true,
          },
          {
            name: "Runtime",
            value: data[0].runtime,
            inline: true,
          }
        )
        .addField("Year", data[0].year, true)
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
