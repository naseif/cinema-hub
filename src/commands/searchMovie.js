const { getMovieID, getDetails } = require("../../api/getMovieBySearch-TMDb");
const { TMDb } = require("../../config.json");

module.exports = {
  name: "sm",
  description: "searches for movies from the imdb database ",
  execute(message, args, clinet, Discord) {
    if (!TMDb)
      return message.channel.send(
        "Your RapidAPI key is not defined in config.json!"
      );

    let searchString = [];
    searchString[0] = "";
    args.forEach((was) => {
      if (Number(was)) {
        searchString[1] = was;
      } else {
        if (searchString[0].length === 0) {
          searchString[0] += was;
        } else {
          searchString[0] += " " + was;
        }
      }
    });

    if (!searchString[0])
      return message.channel.send("You have to provide a Movie name!");
    console.log(searchString);
    let moviePromise;

    if (searchString[1]) {
      moviePromise = getMovieID(searchString[0], searchString[1])
        .then((id) => {
          return getDetails(id);
        })
        .then((movie) => {
          return movie;
        });
    } else {
      moviePromise = getMovieID(searchString[0])
        .then((id) => {
          return getDetails(id);
        })
        .then((movie) => {
          return movie;
        });
    }
    moviePromise.then((movie) => {
      const user = message.mentions.users.first() || message.author;
      const infoEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`${movie.title} (${movie.release_date.slice(0, 4)})`)
        .setURL(`https://www.themoviedb.org/movie/${movie.id}`)
        .setAuthor(`${user.username}`)
        .setDescription(movie.overview)
        .setThumbnail(
          `https://image.tmdb.org/t/p/h60${
            movie.production_companies[0]?.logo_path
              ? movie.production_companies[0].logo_path
              : "https://i.imgur.com/0W3T391.png"
          }`
        )
        .addFields(
          {
            name: "Genres",
            value: `${movie.genres.map((genre) => genre.name).join("-")}`,
          },
          {
            name: "Rating",
            value: `${
              movie.vote_average ? movie.vote_average : "Not aired yet!"
            }`,
            inline: true,
          },
          {
            name: "Runtime",
            value: movie.runtime,
            inline: true,
          }
        )
        .addField("Year", movie.release_date.slice(0, 4), true)
        .addField(
          "Language",
          movie.spoken_languages.map((lang) => lang.english_name).join(", "),
          true
        )
        .addField(
          "Tagline",
          `${movie?.tagline ? movie.tagline : "Ups, no Tagline :("}`,
          true
        )
        .setImage(
          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
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
