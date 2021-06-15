const axios = require("axios").default;
const { rapidapikey } = require("../config.json");

function getSeasons(id) {
  return new Promise((resolve) => {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/title/get-seasons",
      params: { tconst: id },
      headers: {
        "x-rapidapi-key": rapidapikey,
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
}

exports.getSeasons = getSeasons;

// getSeasons("tt0773262").then((data) =>
//   data[8].episodes.map((title) =>
//     console.log(`Episode ${title.episode} - Title : ${title.title}`)
//   )
// );
