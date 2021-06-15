const axios = require("axios").default;
const { rapidapikey } = require("../config.json");
let responseObject = {};

function getFind(string) {
  return new Promise(function (resolve) {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/title/find",
      params: { q: string },
      headers: {
        "x-rapidapi-key": rapidapikey,
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        responseObject = {
          id: response.data.results[0].id,
          imageUrl: response.data.results[0].image.url,
          episodesNumber: response.data.results[0].numberOfEpisodes,
          seriesStartYear: response.data.results[0].seriesStartYear,
          seriesEndYear: response.data.results[0].seriesEndYear,
          title: response.data.results[0].title,
          type: response.data.results[0].titleType,
          year: response.data.results[0].year,
          runtime: response.data.results[0].runningTimeInMinutes,
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

exports.getFind = getFind;
