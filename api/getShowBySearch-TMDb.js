const fetch = require("node-fetch");
const { TMDb } = require("../config.json");

async function getShowID(searchParam) {
  try {
    const apiCall = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${TMDb}&language=en-US&page=1&query=${searchParam}`
    );
    if (!apiCall) return;
    const convertResponeToJson = await apiCall.json();
    return convertResponeToJson.results[0].id;
  } catch (err) {
    throw err;
  }
}

async function getDetails(id) {
  try {
    const apiCall = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDb}&language=en-US`
    );
    const convertRes = await apiCall.json();
    return convertRes;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getShowID,
  getDetails,
};
