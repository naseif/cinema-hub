const axios = require("axios").default;
const { rapidapikey } = require("../config.json");

let responseObject;
function getGenresAndPlot(id) {
  return new Promise((resolve) => {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/title/get-overview-details",
      params: { tconst: id },
      headers: {
        "x-rapidapi-key": rapidapikey,
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        responseObject = {
          genres: response.data.genres,
          plot: response.data.plotSummary.text,
          rating: response.data.ratings.rating,
        };
        return responseObject;
      })
      .then((data) => {
        resolve(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
}

exports.getGenresAndPlot = getGenresAndPlot;
