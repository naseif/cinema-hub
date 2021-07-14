const getAnimeByImage = require("../../api/getAnimeByImage");

module.exports = {
  name: "whatanime",
  description: "Scans an Image to get the anime name! <whatanime 'link'>",
  execute(message, args, client, Discord) {
    if (!args[0])
      return message.channel.send("You need to provide an image link!");
    const firstPossibleAnimes = 3;
    let resultsArray = [];
    getAnimeByImage(args[0]).then((imageInfo) => {
      imageInfo.docs.slice(0, firstPossibleAnimes).map((info, index) => {
        resultsArray.push(
          `${index + 1}: ${info.title_english} **AKA** ${info.title_romaji}`
        );
      });

      const scannedImageResult = new Discord.MessageEmbed()
        .setTitle("Image Scan Result")
        .setColor("#00b3b3")
        .setDescription(resultsArray);

      message.channel.send(scannedImageResult);
    }).catch(error => message.channel.send("Failed to proccess image! Please make sure the image URL is public! Otherwise the Anime does not exist in my database!"))
  },
};
