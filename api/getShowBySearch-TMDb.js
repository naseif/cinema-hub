const fetch = require("node-fetch");
const { TMDb } = require("../config.json");

async function getShowID(searchParam) {
  const apiCall = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${TMDb}&language=en-US&page=1&query=${searchParam}`
  );
  const convertResponeToJson = await apiCall.json();
  return convertResponeToJson.results[0].id;
}

async function getDetails(id) {
  const apiCall = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDb}&language=en-US`
  );
  const convertRes = await apiCall.json();
  return convertRes;
}

module.exports = {
  getShowID,
  getDetails,
};
