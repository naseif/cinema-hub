const jikanjs = require("jikanjs");
jikanjs.settings.setBaseURL("https://api.jikan.moe/v3", 3);

async function getAnimeInfo(animeName, type = "anime") {
  try {
    const getId = await jikanjs.search(type, animeName, [1]);
    const animeId = getId.results[0].mal_id;
    const getFullInfo = await jikanjs.loadAnime(animeId, "/");
    const genresArray = getFullInfo.genres.map((element) => element.name);

    return {
      malid: getFullInfo.mal_id,
      imageUrl: getFullInfo.image_url,
      titlerom: getFullInfo.title,
      titleeng: getFullInfo.title_english,
      episodes: getFullInfo.episodes,
      status: getFullInfo.status,
      rating: getFullInfo.rating,
      score: getFullInfo.score,
      rank: getFullInfo.rank,
      synopsis: getFullInfo.synopsis,
      premiered: getFullInfo.premiered,
      genres: genresArray,
      aired: getFullInfo.aired.string,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = getAnimeInfo;
