const fetch = require("node-fetch");

function randomIndex(index) {
  return Math.floor(Math.random() * index);
}

async function getRandomQuotes() {
  try {
    const requestQuote = await fetch("https://animechan.vercel.app/api/random");
    const quote = await requestQuote.json();
    return quote;
  } catch (err) {
    throw err;
  }
}

async function getByAnimeName(animeName) {
  try {
    const getQuoteByAnimeName = await fetch(
      `https://animechan.vercel.app/api/quotes/anime?title=${animeName}`
    );
    const quote = await getQuoteByAnimeName.json();
    const getRandomQuoteFromTheArray = randomIndex(quote.length);

    return quote[getRandomQuoteFromTheArray];
  } catch (err) {
    throw err;
  }
}

async function getQuoteByCharacterName(characterName) {
  try {
    const getQuoteByCharacter = await fetch(
      `https://animechan.vercel.app/api/quotes/character?name=${characterName}`
    );
    const quote = await getQuoteByCharacter.json();
    const getRandomQuoteFromTheArray = randomIndex(quote.length);

    return quote[getRandomQuoteFromTheArray];
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getRandomQuotes,
  getByAnimeName,
  getQuoteByCharacterName,
};
