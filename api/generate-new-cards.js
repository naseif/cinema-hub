const fetch = require("node-fetch");

async function generateNewDeck(deck) {
  try {
    const getNewDeck = await fetch(
      `http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck}`
    );
    const res = await getNewDeck.json();
    return {
      deckId: res.deck_id,
      remainingCards: res.remaining,
    };
  } catch (error) {
    throw error;
  }
}
