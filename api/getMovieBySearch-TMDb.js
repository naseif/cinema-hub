const fetch = require("node-fetch");
const { TMDb } = require("../config.json");

async function getMovieID(searchParam, year, message) {
  try {
    const apiCall = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDb}&language=en-US&query=${searchParam}&page=1&include_adult=false&year=${year}`
    );
    const convertResponeToJson = await apiCall.json();
    if (!convertResponeToJson.total_results)
      throw new Error(`${"Nothing found with this name!"}`);

    return convertResponeToJson.results[0].id;
  } catch (err) {
    throw err;
  }
}

async function getDetails(id, message) {
  try {
    const apiCall = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDb}&language=en-US`
    );
    const convertRes = await apiCall.json();
    return convertRes;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getMovieID,
  getDetails,
};
