const fetch = require("node-fetch");

async function getAnimeByImage(imageLink) {
  const processImage = await fetch(
    `https://trace.moe/api/search?url=${imageLink}`
  );
  const handleResponse = await processImage.json();
  return handleResponse;
}

module.exports = getAnimeByImage;
