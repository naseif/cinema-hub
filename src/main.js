const Discord = require("discord.js");
const fs = require("fs");
const { prefix, token } = require("../config.json");
const path = __dirname;
const client = new Discord.Client();
let commands = (client.commands = new Discord.Collection());

if (!prefix) {
  console.log("Please define your own prefix in config.json");
  return;
}

if (!token) {
  console.log("Please add you own discord token in config.json");
  return;
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`Use ${prefix}help`);
});

const commandFiles = fs
  .readdirSync(path + "/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`${path}/commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (!message.guild) return;
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command)) return;
  try {
    client.commands.get(command).execute(message, args, client, Discord);
  } catch (err) {
    console.error(err);
    message.reply("Command Unknown!");
  }
});
client.login(token);

exports.commands = commands;
