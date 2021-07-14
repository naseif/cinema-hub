const fetch = require("node-fetch");

async function getAnimeByImage(imageLink) {
  try {
    const processImage = await fetch(
      `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(
        imageLink
      )}`
    );
    const handleResponse = await processImage.json();
    return handleResponse;
  } catch (err) {
    console.error(err);
  }
}

module.exports = getAnimeByImage;
