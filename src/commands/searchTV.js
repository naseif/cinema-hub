const { TMDb } = require("../../config.json");
const { getShowID, getDetails } = require("../../api/getShowBySearch-TMDb");

module.exports = {
  name: "stv",
  description: "searches tv shows from the imdb database ",
  execute(message, args, client, Discord) {
    if (!TMDb)
      return message.channel.send(
        "Your TMDb key is not defined in config.json!"
      );
    const searchString = args.join(" ");
    if (!searchString)
      return message.channel.send("You have to provide a Show name!");

    const fullShowDetails = getShowID(searchString)
      .then((id) => {
        return getDetails(id);
      })
      .then((details) => {
        return details;
      });

    fullShowDetails.then((show) => {
      const user = message.mentions.users.first() || message.author;
      const infoEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`${show.name} (${show.first_air_date.slice(0, 4)})`)
        .setURL(`https://www.themoviedb.org/tv/${show.id}`)
        .setAuthor(`${user.username}`)
        .setDescription(show.overview)
        // .setDescription(data[1].genres)
        .setThumbnail(
          `https://image.tmdb.org/t/p/h60${show.networks[0].logo_path}`
        )
        .addFields(
          {
            name: "Seasons",
            value: `${show.number_of_seasons}`,
          },
          {
            name: "Available at",
            value: `${show.networks[0]?.name}`,
            inline: true,
          },
          {
            name: "Status",
            value: `${show.status}`,
            inline: true,
          },
          {
            name: "Rating",
            value: `${show.vote_average}`,
            inline: true,
          },
          {
            name: "Last Episode Air Date",
            value: `${show.last_episode_to_air.air_date}`,
            inline: true,
          },
          {
            name: "Next Episode Number & Air Date",
            value: `Episode ${
              show.next_episode_to_air?.episode_number
                ? show.next_episode_to_air.episode_number
                : "Unknown"
            } - ${
              show.next_episode_to_air?.air_date
                ? show.next_episode_to_air.air_date
                : "Finished"
            }`,
            inline: false,
          }
        )
        .addField(
          "Episodes Number",
          `${show.number_of_episodes ? show.number_of_episodes : "Unknown"}`,
          true
        )
        .addField("Type", show.type, true)

        .addField(
          "Genres",
          `${show.genres.map((genre) => genre.name).join("-")}`,
          false
        )
        .addField("Language", show.spoken_languages[0].english_name, true)
        .addField("Tagline", show.tagline, true)
        .setImage(
          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${show.poster_path}`
        )
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
