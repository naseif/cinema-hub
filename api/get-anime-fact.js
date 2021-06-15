const AnimeFact = require("anime-facts");
const { animuToken } = require("../config.json");
const api = new AnimeFact(animuToken);

async function getRandomFact() {
  try {
    const getFact = await api.getFact(null);
    return getFact;
  } catch (err) {
    console.log(err);
  }
}

module.exports = getRandomFact;
