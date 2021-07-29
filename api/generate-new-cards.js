const fetch = require("node-fetch");
const fs = require("fs");

async function generateDeck(decksNumber) {
  try {
    const getNewDeck = await fetch(
      `http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${decksNumber}`
    );
    const res = await getNewDeck.json();
    if (fs.existsSync(`${__dirname}/deckData.json`)) {
      try {
        fs.unlinkSync(`${__dirname}/deckData.json`);
      } catch (err) {
        console.error(`Could not Remove File, ${err.message}`);
      }
    }
    fs.writeFile(
      `${__dirname}/deckData.json`,
      `{"deckID": "${res.deck_id}"}`,
      "UTF-8",
      (err) => {
        if (err) throw new Error(`Could not write File!!`);
      }
    );
  } catch (err) {
    throw err;
  }
}

async function replaceOldDeck(decksNumber) {
  try {
    const newDeck = await generateDeck(decksNumber);
  } catch (err) {
    throw err;
  }
}
