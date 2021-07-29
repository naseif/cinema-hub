const fetch = require("node-fetch");
const fs = require("fs");

async function generateDeck(decksNumber = "1") {
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
      `{"deckID": "${res.deck_id}", "remaining": "${res.remaining}"}`,
      "UTF-8",
      (err) => {
        if (err) throw new Error(`Could not write File!!`);
      }
    );
  } catch (err) {
    throw err;
  }
}

async function reshuffleCards(decksNumber) {
  try {
    const deckID = require("./deckData.json");
    const reshuffleDeck = await fetch(
      `http://deckofcardsapi.com/api/deck/${deckID.deckID}/shuffle/`
    );
  } catch (err) {
    throw err;
  }
}

async function drawCards(numberOfCardsToDraw) {
  try {
    const deckData = require("./deckData.json");
    const drawCardFromTheDeck = await fetch(
      `http://deckofcardsapi.com/api/deck/${deckData.deckID}/draw/?count=${numberOfCardsToDraw}`
    );
    const res = await drawCardFromTheDeck.json();
    return res;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  generateDeck,
  reshuffleCards,
  drawCards,
};
