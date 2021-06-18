const fetch = require("node-fetch");
const { TMDb } = require("../config.json");

async function getMovieID(searchParam, year) {
  const apiCall = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDb}&language=en-US&query=${searchParam}&page=1&include_adult=false&year=${year}`
  );
  const convertResponeToJson = await apiCall.json();
  return convertResponeToJson.results[0].id;
}

async function getDetails(id) {
  const apiCall = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDb}&language=en-US`
  );
  const convertRes = await apiCall.json();
  return convertRes;
}

module.exports = {
  getMovieID,
  getDetails,
};
