const AnimeFact = require("anime-facts");
const { animuToken } = require("../config.json");
if (!animuToken)
  return console.error("Please add your own Animu token in config.json");

const api = new AnimeFact(animuToken);

async function getRandomFact() {
  try {
    const getFact = await api.getFact(null);
    return getFact;
  } catch (err) {
    throw err;
  }
}

module.exports = getRandomFact;
